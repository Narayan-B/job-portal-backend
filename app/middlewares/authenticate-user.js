const jwt=require('jsonwebtoken')
const authenticateUser=async(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(400).json('token is required')
    }
    try{
        const tokenData=jwt.verify(token,process.env.PW)
        console.log(tokenData)
        req.user={
            id:tokenData.id,
            role:tokenData.role
        }
        next()
    }catch(err){
        console.log(err)
        res.status(400).json({errors:err})
    }
}
module.exports=authenticateUser