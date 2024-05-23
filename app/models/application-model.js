const { Schema,model } = require("mongoose");

const applicationSchema=new Schema({
    job:{
        type:Schema.Types.ObjectId,
        ref:"Jobs"
    },
    candidate:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        default: 'submitted'
    }
}, { timestamps: true }) 

const Application = model('Application', applicationSchema) 

module.exports = Application 