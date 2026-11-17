const { default: mongoose } = require("mongoose");

const storySchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
    mediaType : {type : String, enum : ["Image","Video"],required : true},
    media : {type : String, required : true},
    viewers : [{type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,}],
    createdAt : {type:Date, default:Date.now(), expires : 86400}
},{timestamps : true})

module.exports = mongoose.model("Story",storySchema)
