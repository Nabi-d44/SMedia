const { uploadonCloudinary } = require("../config/cloudinary")
const User= require("../models/usermodel")

exports.getCurrentuser = async (req,res)=>{
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate("posts shorts")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`get current user error ${error}`})
    }
}

exports.suggestedUsers = async (req,res)=>{
    try {
        const users = await User.find({
            _id : {$ne:req.userId}
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get suggested user error ${error}`})
    }
}

exports.editProfile = async(req,res)=>{
    try {
        const {name,userName,bio,profession,gender} = req.body
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        const sameUserWithUsername = await User.findOne({userName}).select("-password")

        if(sameUserWithUsername && sameUserWithUsername._id.toString() !== req.userId.toString()){
            return res.status(400).json({message : "Username already exists"})
        }

        let profileImage
        if(req.file){
            profileImage = await uploadonCloudinary(req.file.path)
        }

        user.name = name
        user.userName = userName
        if(profileImage){
            user.profileImage = profileImage
        }
        user.bio = bio
        user.profession = profession
        user.gender = gender
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`error while editing ${error}`})
    }
}

exports.getProfile = async (req,res)=>{
    try {
        const userName = req.params.userName
        const user = await User.findOne({userName}).select("-password").populate("posts shorts followers following")
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`get profile error ${error}`})
    }
}

exports.follow = async(req,res)=>{
    try {
        const currentUserId = req.userId
        const targetUserId = req.params.targetUserId
        if(!targetUserId){
            return res.status(400).json({message:"target user is not found"})
        }
        if(currentUserId == targetUserId){
            return res.status(400).json({message:"you cannot follow yourself"})
        }
        const currentUser = await User.findById(currentUserId)
        const targetUser = await User.findById(targetUserId)
        const isFollowing = currentUser.following.includes(targetUserId)
        if(isFollowing){
            currentUser.following = currentUser.following.filter(id=>id.toString() != targetUserId)
            targetUser.followers = targetUser.followers.filter(id=>id.toString() != currentUserId)
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following : false,message:"unfollowed successfully"
            })
        }else{
            currentUser.following.push(targetUserId)
            targetUser.followers.push(currentUserId)
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following : true,message:"followed successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({message:`follow error ${error}`})
    }
}