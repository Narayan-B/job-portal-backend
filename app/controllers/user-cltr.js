const User=require('../models/user-model')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const {validationResult}=require('express-validator')
const userCltr={}
userCltr.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const salt= await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        const user=new User(body)
        user.password=hashPassword
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:err})
    }

}
userCltr.Login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(user){
           const isAuth=await bcryptjs.compare(body.password,user.password)
           if(isAuth){
            const tokenData={
                id:user._id,
                role:user.role
            }
            const token=jwt.sign(tokenData,process.env.PW,{expiresIn:'7d'})
           return res.json({'token':token})
           }
           return res.status(400).json({errors:'email/pw might be wrong'})
        }
        return res.status(400).json({errors:'email/pw might be wrong'})
    }catch(err){
        console.log(err)
        res.status(500).json({errors:err})
    }

}
userCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        console.log(req.user,'user') //{ id: '66237b6a8ac5888432e2fb38', role: 'candidate' }
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}
userCltr.checkEmail=async (req,res)=>{
    const email=req.query.email
    const user=await User.findOne({email:email})
    if(user){
        return res.json({status:true})
    }else{
        return res.json({status:false})
    }
}
module.exports=userCltr