const Application = require('../models/application-model')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const applicationsCltr = {}

applicationsCltr.apply = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    
    try { 
        const body = _.pick(req.body, ['job'])
        const application = new Application(body)
        application.candidate = req.user.id 
        await application.save()
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.status(500).json({error: 'something went wrong'})
    }
}

applicationsCltr.myApplications= async (req, res) => {
        try {
            const jobId = req.params.id;
            console.log(jobId)
            const applications = await Application.find({ job: jobId }).populate('candidate',['_id',"username",'email'])
            res.json(applications);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
applicationsCltr.meApplied=async(req,res)=>{
    try{
        const applied=await Application.find({candidate:req.user.id}).populate('job')
        if(!applied){
            return res.status(404).json('u didnt applied for any job')
        }
        return res.json(applied)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
applicationsCltr.checkApplied=async(req,res)=>{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    try{
        const jobId=req.query.id
        const check=await Application.find({candidate:req.user.id,job:jobId})
        //res.json(check)
        if(check.length===0){
            return res.json({applied:false})
        }
        return res.json({applied:true})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
}
applicationsCltr.statusUpdate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        
        // Find the application based on the job ID
        const application = await Application.findOne({ job: id ,candidate:req.body.candidate});

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Optionally, you can add additional checks here to verify if the user making the request is authorized to update the application

        // Update the status of the application (assuming the new status is provided in the request body)
        application.status = req.body.status; // Assuming the new status is in the request body

        // Save the updated application
        await application.save();

        res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = applicationsCltr;
