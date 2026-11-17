const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service : "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendMail = async (to,otp)=>{
    await transporter.sendMail({
        from : process.env.SMTP_USER,
        to: to,
        subject : "Reset you password",
        html : `<p>Your OTP for password reset is <b>${otp}</b>.It expires in 5 minutes</p>`
    })
}