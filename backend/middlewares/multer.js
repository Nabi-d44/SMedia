//middleware to keep img,vid in public folder
const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./public")
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage : storage})
module.exports = upload
//upload is now a middleware,that receive files save em to disk,and give req.file to use in controller