const notFoundLink = (req, res, next) => {
    const error = new Error(`Chúng tôi gặp sự cố khi truy cập đường dẫn ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const error = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
    
 }

 export {notFoundLink, error}