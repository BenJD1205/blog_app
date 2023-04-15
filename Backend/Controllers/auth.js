const asyncErrorWrapper = require("express-async-handler")
const User = require("../Models/user");
const CustomError = require("../Helpers/error/CustomError");
const { sendToken } = require("../Helpers/auth/tokenHelpers");
// const sendEmail = require("../Helpers/Libraries/sendEmail");
const { validateUserInput, comparePassword } = require("../Helpers/input/inputHelpers");

const getPrivateData = asyncErrorWrapper((req, res, next) => {

    return res.status(200).json({
        success: true,
        message: "You got access to the private data in this route ",
        user: req.user

    })

})

const register = asyncErrorWrapper(async (req, res, next) => {

    const { username, email, password } = req.body;

    const newUser = await User.create({
        username,
        email,
        password
    })

    sendToken(newUser, 201, res)


})

const login = asyncErrorWrapper(async (req, res, next) => {

    const { email, password } = req.body

    if (!validateUserInput(email, password)) {

        return next(new CustomError("Vui lòng nhập email và password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {

        return next(new CustomError("Người dùng không tồn tại", 404))
    }

    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Mật khẩu chưa chính xác", 404))
    }

    sendToken(user, 200, res);

})




const forgotpassword = asyncErrorWrapper(async (req, res, next) => {
    const { URI, EMAIL_USERNAME } = process.env;

    const resetEmail = req.body.email;

    const user = await User.findOne({ email: resetEmail })

    if (!user) {
        return next(new CustomError("Email của người dùng không hợp lệ", 400))
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();

    const resetPasswordUrl = `${URI}/resetpassword?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = `
    <h3 style="color : red "> Đặt lại mật khẩu </h3>
    <p> Đường <a href=${resetPasswordUrl}   
     target='_blank'  >Link </a> sẽ hết hạn sau 1 tiêngs </p> 
    `;

    try {

        sendEmail({
            from: EMAIL_USERNAME,
            to: resetEmail,
            subject: " ✔ Reset Your Password  ✔",
            html: emailTemplate
        })

        return res.status(200)
            .json({
                success: true,
                message: "Email Send"
            })

    }

    catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError('Email could not be send ', 500))
    }



})


const resetpassword = asyncErrorWrapper(async (req, res, next) => {

    const newPassword = req.body.newPassword || req.body.password

    const { resetPasswordToken } = req.query

    if (!resetPasswordToken) {

        return next(new CustomError("Token không hợp lệ ", 400))
    }

    const user = await User.findOne({

        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }

    })

    if (!user) {
        return next(new CustomError("Token đã hết hạn", 400))
    }


    user.password = newPassword;

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Đặt lại mật khẩu thành công"
    })

})


module.exports = {
    register,
    login,
    resetpassword,
    forgotpassword,
    getPrivateData
}