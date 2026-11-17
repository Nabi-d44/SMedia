const { uploadonCloudinary } = require("../config/cloudinary")
const Short = require("../models/Shortsmodel")

const User = require("../models/usermodel")

exports.uploadShort = async(req,res)=>{
    try {
        const {caption} = req.body
        let media
        if(req.file){
            media = await uploadonCloudinary(req.file.path)
            // console.log("Media from cloudinary",media)
        }else{
            return res.status(400).json({message : "media is required"})
        }
        const short = await Short.create({caption,media,author:req.userId})
        const user = await User.findById(req.userId)
        user.shorts.push(short._id)
        await user.save()
        const populatedShort = await Short.findById(short._id).populate("author","name userName profileImage")
        return res.status(201).json(populatedShort)
    } catch (error) {
        return res.status(500).json({message :`error while uploading shorts ${error}`})
    }
}

exports.getAllShorts = async(req,res)=>{
    try {
        const shorts = await Short.find({}).populate("author","name userName profileImage").populate("comments.author")
        return res.status(200).json(shorts)
    } catch (error) {
        return res.status(500).json({message : `error while fetching shorts ${error}`})
    }
}

exports.like = async(req,res)=>{
    try {
        const shortId = req.params.shortId
        const short = await Short.findById(shortId)
        if(!short){
            return res.status(400).json({message : "short not found"})
        }
        const alreadyLiked = short.likes.some(id=>id.toString() == req.userId.toString())
        if(alreadyLiked){
            short.likes = short.likes.filter(id=>id.toString() !== req.userId.toString())
        }else{
            short.likes.push(req.userId)
        }
        await short.save()
        await short.populate("author","name userName profileImage")
        return res.status(200).json(short)
    } catch (error) {
        return res.status(500).json({message : `error while liking shorts${error}`})
    }
}

exports.comment = async(req,res)=>{
    try {
        const {message} = req.body
        const shortId = req.params.shortId
        const short = await Short.findById(shortId)
        if(!short){
            return res.status(400).json({message : "short not found"})
        }
        short.comments.push({author:req.userId,message})
        await short.save()
        await short.populate("author","name userName profileImage")
        await short.populate("comments.author","name userName profileImage")
        return res.status(200).json(short)
    } catch (error) {
        return res.status(500).json({message : `error while commenting shorts ${error}`})
    }
}

