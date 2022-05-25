import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import generateToken from '../generateToken.js'

const verifyUser = expressAsyncHandler(async (req, res) => {
    
    const { phone, password } = req.body
    const user = await User.findOne({phone})

    if(user && await user.checkMatchPass(password)){
        res.json({
            _id: user._id,
            phone: user.phone,
            name: user.name,
            token: generateToken(user._id)
        })
    } else{
        res.status(401)
        throw new Error('Sai tên đăng nhập hoặc mật khẩu!')
    }

})


export { verifyUser }