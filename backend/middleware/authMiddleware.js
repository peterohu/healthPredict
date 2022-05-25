import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect =  expressAsyncHandler (async (req, res, next) => {
    let token 
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Vui lòng đăng nhập để tiếp tục!')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Vui lòng đăng ký tài khoản!')
    }
    
})


const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else{
        res.status(401)
        throw new Error('Bạn cần có tài khoản ADMIN để tiếp tục!')
    }
}

export { protect, admin }