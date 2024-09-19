const mongoose = require('mongoose');
const { Schema } = mongoose;
const accessReqSch = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    Student_name: {
        type: String
    },
    Teacher_name: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'cancelled', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

accessReqSch.index({ teacher: 1 });
const AccessRequest = mongoose.model('AccessRequest', accessReqSch);
module.exports = AccessRequest;