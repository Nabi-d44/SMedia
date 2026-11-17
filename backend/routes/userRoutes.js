const express = require("express")
const { isAuth } = require("../middlewares/isAuth")
const { getCurrentuser, suggestedUsers, editProfile, getProfile, follow } = require("../controllers/userControllers")
const upload = require("../middlewares/multer")

const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentuser)
//isAuth middleware will get the token from cookie,then verify,& insert in req obj
userRouter.get("/suggested",isAuth,suggestedUsers)
userRouter.get("/getProfile/:userName",isAuth,getProfile)
userRouter.post("/editProfile",isAuth,upload.single("profileImage"),editProfile)
userRouter.post("/follow/:targetUserId",isAuth,follow)


module.exports = userRouter