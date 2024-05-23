const User=require('../models/user-model')
const userRegisterValidationSchema={
    username:{
        in:['body'],
        exists:{errorMessage:'username is required'},
        notEmpty:{errorMessage:'username should not be empty'},
        isString:{errorMessage:"user name should be string"},
        trim:true
    },
    email:{
        in:['body'],
        exists:{errorMessage:'email is required'},
        notEmpty:{errorMessage:'email should not be empty'},
        isEmail:{errorMessage:'email should be in format'},
        normalizeEmail:true,
        trim:true,
        custom:{
            options:async function(value){
                const user= await User.findOne({email:value})
                if(user){
                    throw new Error('Email already exists')
                }
                return true
            }
        }
    },
    password:{
        in:['body'],
        exists:{errorMessage:'pw is required'},
        notEmpty:{errorMessage:'pw should not be empty'},
        isStrongPassword:{errorMessage:'pw should be strong'},
        isLength:{
            options:{min:8,max:128},
            errorMessage:'pw should be in b/w 8-128 chars'
        },
        trim:true
    },
    role:{
        in:['body'],
        exists:{errorMessage:'role is required'},
        notEmpty:{errorMessage:'role should not be empty'},
        isIn:{
            options:[['candidate','recruiter']],
            errorMessage:'role should be candidate or recruiter'
        },
        trim:true
    }
}
module.exports=userRegisterValidationSchema