const { uploadonCloudinary } = require("../config/cloudinary")
const Story = require("../models/storymodel")
const User = require("../models/usermodel")

exports.uploadStory = async(req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(user.story){
            await Story.findByIdAndDelete(user.story)
            user.story = null
        }
        const {mediaType} = req.body
        let media
        if(req.file){
            media = await uploadonCloudinary(req.file.path)
        }else{
            return res.status(400).json({message : "media is required"})
        }
        const story = await Story.create({author:req.userId,mediaType,media})
        user.story = story._id
        await user.save()
        const populatedStory = await Story.findById(story._id)
        .populate("author","name userName profileImage")
        .populate("viewers","name userName profileImage")
        return res.status(200).json(populatedStory)
    } catch (error) {
        return res.status(500).json({message : "error while uploading story"})
    }
}

exports.viewStory = async(req,res)=>{
    try {
        const storyId = req.params.storyId
        const story = await Story.findById(storyId)
        if(!story){
            return res.status(400).json({message : "story not found"})
        }
        const viewerIds = story.viewers.map(id=>id.toString())
        if(!viewerIds.includes(req.userId.toString())){
            story.viewers.push(req.userId)
            await story.save()
        }
        const populatedStory = await Story.findById(story._id)
        .populate("author","name userName profileImage")
        .populate("viewers","name userName profileImage")
        return res.status(200).json(populatedStory)
    } catch (error) {
        return res.status(500).json({message : "error while viewing story"})
    }
}

exports.getStoryByUserName = async(req,res)=>{
    try {
        const userName = req.params.userName
        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        const story = await Story.find({author:user._id})
        .populate("author","name userName profileImage")
        .populate("viewers","name userName profileImage")
        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({message : "error while fetching story byusername"})
    }
}