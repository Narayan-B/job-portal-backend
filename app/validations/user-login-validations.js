const userLoginValidationSchema={
    email:{
        in:['body'],
        exists:{errorMessage:'email is required'},
        notEmpty:{errorMessage:'email should not be empty'},
        trim:true
    },
    password:{
        in:['body'],
        exists:{errorMessage:'pw is required'},
        notEmpty:{errorMessage:'pw should not be empty'},
        trim:true,
        isLength:{
            options:{min:8,max:128},
            errorMessage:'pw should be in b/w 8-128 chars'
        },

    }
}
module.exports=userLoginValidationSchema