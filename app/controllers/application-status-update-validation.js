const applicationStatusUpdateValidationSchema={
    status:{
        in:['body'],
        exists:{errorMessage:'Status is required'},
        notEmpty:{errorMessage:'Status should be empty'},
        isIn:{
            options:[["viewed","shortlisted","notShortlisted","interviewed","hired"]],
            errorMessage:'status should be one of above'
        },
        trim:true
    }
}
module.exports=applicationStatusUpdateValidationSchema