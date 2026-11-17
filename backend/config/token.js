const jwt = require("jsonwebtoken")

exports.genToken =  (userId) => {
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1y"})
        return token
    } catch (error) {
        throw new Error(`gen token error ${error}`)
    }
}
