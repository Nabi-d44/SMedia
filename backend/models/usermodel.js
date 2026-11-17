const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    userName : {type:String,required:true,unique:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    profileImage: {type:String},
    bio : {type:String},
    profession : {type:String},
    gender : {type:String, enum:["male","female"]},
    followers : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    following : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    posts :[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    saved : [{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    shorts : [{type:mongoose.Schema.Types.ObjectId,ref:"Short"}],
    story : {type : mongoose.Schema.Types.ObjectId,ref:"Story"},
    resetOtp : {type : String, },
    otpExpires : {type : Date},
    isOtpVerified:{type : Boolean,default : false}
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)
