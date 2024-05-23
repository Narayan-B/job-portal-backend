require('dotenv').config()
const cors=require('cors')
const express=require('express')
const configureDB=require('./config/db')
const {checkSchema}=require('express-validator')
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userCltr = require('./app/controllers/user-cltr')
const userLoginValidationSchema = require('./app/validations/user-login-validations')
const jobCltr = require('./app/controllers/job-cltr')
const authenticateUser=require('./app/middlewares/authenticate-user')
const authorizeUser=require('./app/middlewares/authorize-user')
const jobValidationSchema = require('./app/validations/job-validations')
const applicationValidationSchema = require('./app/validations/application-validations')
const applicationsCltr = require('./app/controllers/application-cltr')
const mongoIdValidationSchema = require('./app/validations/mongoId-validation')
const applicationStatusUpdateValidationSchema = require('./app/controllers/application-status-update-validation')
const app=express()
const port=3456
app.use(express.json())
app.use(cors())
configureDB()

app.post('/register',checkSchema(userRegisterValidationSchema),userCltr.register)

app.post('/login',checkSchema(userLoginValidationSchema),userCltr.Login)

app.get('/account',authenticateUser,userCltr.account)

app.get('/all-jobs',jobCltr.list)
//all jobs created by recruiter
app.get('/single-job/:id',jobCltr.singleJob)
app.get('/my-jobs',authenticateUser,authorizeUser(['recruiter']),jobCltr.myJobList)
//single job details created  by recruiter
app.get('/my-job/:id',authenticateUser,authorizeUser(['recruiter']),jobCltr.myJob)
//create a job by recruiter
app.post('/add-job',authenticateUser,authorizeUser(['recruiter']),checkSchema(jobValidationSchema),jobCltr.create)
//update a job by recruiter
app.put('/update-job/:id',authenticateUser,authorizeUser(['recruiter']),checkSchema(jobValidationSchema),jobCltr.update)
//delete a job by recruiter
app.delete('/delete-job/:id',authenticateUser,authorizeUser(['recruiter']),jobCltr.delete)

//apply job by canddidate
app.post('/apply-job',authenticateUser,authorizeUser(['candidate']),checkSchema(applicationValidationSchema),applicationsCltr.apply)
//see the applications of a particular job by recruiter
app.get('/recruiter-applications/:id',authenticateUser,authorizeUser(['recruiter']),applicationsCltr.myApplications)
//see the application applied by a candidate
app.get('/candidate-applied',authenticateUser,authorizeUser(['candidate']),applicationsCltr.meApplied)
//check for applied or not
app.get('/check-applied',authenticateUser,authorizeUser(['candidate']),checkSchema(mongoIdValidationSchema),applicationsCltr.checkApplied)
//status cahnge
app.put('/update-status/:id',authenticateUser,authorizeUser(['recruiter']),checkSchema(applicationStatusUpdateValidationSchema),applicationsCltr.statusUpdate)
app.get('/checkemail',userCltr.checkEmail)
app.listen(port,()=>{
    console.log('server is running on',port)
})