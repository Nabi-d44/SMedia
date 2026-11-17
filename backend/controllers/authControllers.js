const { sendMail } = require("../config/Mail")
const {genToken} = require("../config/token")
const User = require("../models/usermodel")
const bcrypt = require("bcryptjs")

exports.signup = async (req,res)=>{
    try{
        const {name,email,password,userName} = req.body
        const findByEmail = await User.findOne({email})
        if(findByEmail){
            return res.status(400).json({message : "Email already exists!!"})
        }
        const findByuserName = await User.findOne({userName})
        if(findByuserName){
            return res.status(400).json({message : "userName already exists!!"})
        }
        if(password.length<6){
            return res.status(400).json({message : "password must be atleast 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password : hashedPassword,userName})
        const token = genToken(user._id)
        //storing token in users browser as a cookie
        res.cookie("token",token,{
            httpOnly : true,
            maxAge : 1*365 *24860*60*1000,
            secure : false,
            sameSite : "Strict"
        })
        return res.status(201).json(user)
    }catch(error){
        return res.status(500).json({message : `signup error ${error}`})
    }
}

exports.login = async (req,res)=>{
    try{
        const {password,userName} = req.body
        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({message :"Invalid username or password!"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid username or password!"})
        }
        const token = await genToken(user._id)
        
        res.cookie("token",token,{
            httpOnly : true,
            maxAge : 1*365 *24*60*60*1000,
            secure : false,
            sameSite : "Strict"
        })
        // return res.status(200).json(user)
        return res.status(200).json({_id : user._id,name:user.name,userName:user.userName,email:user.email})
    }catch(error){
        return res.status(500).json({message : `Login error ${error}`})
    }
}

exports.logout = async (req,res)=>{
    try {
        res.clearCookie("token")//delete cookie saved under the name token
        return res.status(200).json({message:"Signed out successfully"})
    } catch (error) {
        return res.status(500).json({message : `Signout error ${error}`})
    }
}

exports.sendOtp = async (req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "User not found"})
        }
        const otp = Math.floor(1000+Math.random()*9000).toString()

        user.resetOtp = otp
        user.otpExpires = Date.now() + 5*60*1000
        user.isOtpVerified = false  

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({message : "otp sent successfully"})
    } catch (error) {
        return res.status(500).json({message : `Error sending otp ${error}`})
    }
}

exports.verifyOtp = async (req,res)=>{
    try {
        const {email,otp} = req.body
        const user = await User.findOne({email}) 
        if(!user || user.resetOtp !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({message : "invalid/otp got expired"})
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({message : "otp verified successfully"})
    } catch (error) {
        return res.status(500).json({message : `otp verification error ${error}`})
    }
}

exports.resetpassword = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email}) 
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message : "Otp verifcation required"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({message : "password resets successfully"})
    } catch (error) {
        return res.status(500).json({message : `error while password reset ${error}`})
    }
}