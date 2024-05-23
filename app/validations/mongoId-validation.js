const mongoIdValidationSchema = {
    id: {
        in: ['query'],
        exists: {
            errorMessage: 'Job ID is required'
        },
        notEmpty: {
            errorMessage: 'Job ID should not be empty'
        },
        isMongoId: {
            errorMessage: 'Job ID should be a valid MongoDB ObjectId'
        }
    }
}

module.exports = mongoIdValidationSchema;