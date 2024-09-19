function validateRole(role){
    return(req,res,next)=>{
        try{
            if(req.user[0] == role || req.user.role == role){
              console.log("role is verifying sucessfully")
              next()
            }
            else{
              res.json({
                message:"No required permission"
              })
            }
          }
          catch(e){
              console.log(e)
          }
    }     
}

module.exports = validateRole;