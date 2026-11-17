require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const shortRouter = require("./routes/shortRoutes");
const storyRouter = require("./routes/storyRoutes");

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/short",shortRouter)
app.use("/api/story",storyRouter)

const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to DB")
    app.listen(port,()=>{
    console.log(`SERVER running on address http://localhost:${port}`)
})
}).catch((err)=>{
    console.log("Error while connecting to MongoDB",err)
})

