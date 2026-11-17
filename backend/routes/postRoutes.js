const express = require("express")
const { isAuth } = require("../middlewares/isAuth")

const upload = require("../middlewares/multer")
const { uploadPost, getAllPosts, like, savedPost, comment } = require("../controllers/postControllers")

const postRouter = express.Router()

postRouter.post("/upload",isAuth,upload.single("media"),uploadPost)
postRouter.get("/getAll",isAuth,getAllPosts)
postRouter.post("/like/:postId",isAuth,like)
postRouter.post("/saved/:postId",isAuth,savedPost)
postRouter.post("/comment/:postId",isAuth,comment)

module.exports = postRouter