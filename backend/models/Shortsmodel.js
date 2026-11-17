const { default: mongoose } = require("mongoose");

const shortsSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
    media: { type: String, required: true },
    caption: {type : String},
    likes : [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],
    comments : [{
        author :{type: mongoose.Schema.Types.ObjectId,ref: "User"},
        message : {type : String}
    }]

},{timestamps:true})

module.exports = mongoose.model("Short",shortsSchema)
