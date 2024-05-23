const mongoose=require('mongoose')
const configureDB=async()=>{
    try{
        const db=await mongoose.connect(process.env.DBURL)
        console.log('DB connected sucessfully')
    }catch(err){
        console.log('err',err)
    }
}
module.exports=configureDB