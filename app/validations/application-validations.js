
const Application = require('../models/application-model');
const Job = require('../models/job-model');

const applicationValidationSchema = {
    job: {
        in: ['body'],
        exists: { 
            errorMessage: 'Job is required'
        },
        notEmpty: {
            errorMessage: 'Job cannot be empty'
        },
        isMongoId: {
            errorMessage: 'Job should be a valid MongoDB ID'
        },
        custom: {
            options: async function(value, { req }) {
                // Check if the job exists
                const job = await Job.findById(value);
                if (!job) {
                    throw new Error('Job not found');
                }

                // Check if the candidate has already applied
                const existingApplication = await Application.findOne({ job: value, candidate: req.user.id });
                if (existingApplication) {
                    throw new Error('You have already applied for this job')
                }

                return true;
            }
        }
    }
}
module.exports = applicationValidationSchema;
