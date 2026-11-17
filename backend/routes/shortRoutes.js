const express = require("express")
const { isAuth } = require("../middlewares/isAuth")

const upload = require("../middlewares/multer")
const { getAllShorts, uploadShort, comment, like } = require("../controllers/shortsControllers")


const shortRouter = express.Router()

shortRouter.post("/upload",isAuth,upload.single("media"),uploadShort)
shortRouter.get("/getAll",isAuth,getAllShorts)
shortRouter.post("/like/:shortId",isAuth,like)
shortRouter.post("/comment",isAuth,comment)

module.exports = shortRouter