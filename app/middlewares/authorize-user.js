const authorizeUser=(Permissions)=>{
    return (req,res,next)=>{
        if(Permissions.includes(req.user.role)){
            next()
        }else{
            return res.status(400).json({errors:'u dont have access to this'})
        }
       
    }
}
module.exports=authorizeUser