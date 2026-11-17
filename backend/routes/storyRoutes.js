const express = require("express")
const { isAuth } = require("../middlewares/isAuth")

const upload = require("../middlewares/multer")
const { uploadStory, getStoryByUserName, viewStory } = require("../controllers/storyControllers")

const storyRouter = express.Router()

storyRouter.post("/upload",isAuth,upload.single("media"),uploadStory)
storyRouter.get("/getByUserName/:userName",isAuth,getStoryByUserName)
storyRouter.get("/view/:storyId",isAuth,viewStory)

module.exports = storyRouter