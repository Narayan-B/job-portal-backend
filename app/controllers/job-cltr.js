const Job=require('../models/job-model')
const {validationResult}=require('express-validator')
const jobCltr={}
jobCltr.list = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found at this time' });
        }
        return res.json(jobs);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
jobCltr.singleJob=async(req,res)=>{
    const id=req.params.id
    try{
        const job=await Job.findById(id)
        if(!job){
           return res.status(404).json('job not found')
        }
        return res.json(job)
    }catch (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
jobCltr.myJobList=async(req,res)=>{
    try{
        const myJobs=await Job.find({recruiter:req.user.id})
        if(!myJobs){
            return res.status(400).json('No jobs found created by u')
        }
        return res.json(myJobs)
    }catch (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
jobCltr.myJob=async(req,res)=>{
    const id=req.params.id
    try{
        const myJob=await Job.findOne({recruiter:req.user.id,_id:id})
        if(!myJob){
            return res.status(400).json('No jobs found created by u')
        }
        return res.json(myJob)
    }catch (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

jobCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const job = new Job(body) 
        job.recruiter = req.user.id 
        await job.save()
        res.status(201).json(job)
    }catch(err){
        console.log(err)
        return res.status(500).json({errors:'something went wrong'})
    }

}
jobCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const id=req.params.id
    try{
       const job= await Job.findOneAndUpdate({_id:id,recruiter:req.user.id},body,{new:true})
       if(!job) {
        return res.status(404).json({ error: 'record not found'})
    }
    res.json(job) 
    }catch(err){
        console.log(err)
        return res.status(500).json({errors:'something went wrong'})

    }

}
jobCltr.delete=async(req,res)=>{
    const id=req.params.id
    try{
        const job=await Job.findOneAndDelete({_id:id,recruiter:req.user.id})
        if(!job){
            return res.status(404).json({ error: 'record not found'})
        }
       return  res.json('Sucessfully deleted')
    }catch(err){
        console.log(err)
        return res.status(500).json({errors:'something went wrong'})
    }
}
module.exports=jobCltr