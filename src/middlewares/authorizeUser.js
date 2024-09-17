const jwt = require('jsonwebtoken')
async function authorizeUser(req,res,next) {
    // const headerValue = req.headers['authorization']
    try{
        const token = req.headers.authorization || req.headers.Authorization
        if(!token){
            res.status(400).json({
                message:"unathorized login"
            })
        }
        if(token){
         const decodedToken =  jwt.verify(token, 'ananta')
         req.user = decodedToken
         console.log(decodedToken)
        }
    }
    catch(e)
{
     res.json({
        message:"inavaid token"
     })
}

next()    
}{}

module.exports = authorizeUser