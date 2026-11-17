const express = require("express")
const { signup, login, logout, sendOtp, verifyOtp, resetpassword } = require("../controllers/authControllers")
const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/sendOtp",sendOtp)
authRouter.post("/verifyOtp",verifyOtp)
authRouter.post("/resetpassword",resetpassword)
authRouter.get("/logout",logout)

module.exports = authRouter