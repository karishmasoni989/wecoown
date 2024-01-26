var mongoose = require("mongoose");

const User_cohorts = mongoose.Schema({
    my_id : {
        type: String,
        required: true,
        trim: true
    },
    all_cohorts_user_id: {
        type: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                ref: 'User',
            },       
        }],
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User_cohorts', User_cohorts);