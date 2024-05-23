// title, description, recruiter, openings, location, jobType - [wfh,wfo, hybrid], experience - { min, max }, deadline, skills - [ String ], package - { min, max }
const {Schema,model}=require('mongoose')
const jobSchema=new Schema({
    title:String,
    description:String,
    recruiter:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    openings:Number,
    location:[String],
    jobType:String,
    skills:[String],
    experience:{
        minExp:Number,
        maxExp:Number
    },
    dueDate:Date,
    salary:{
        minSalary:Number,
        maxSalary:Number
    }


},{timestamps:true})
const Job=model('Jobs',jobSchema)
module.exports=Job