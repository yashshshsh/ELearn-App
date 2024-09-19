const mongoose = require('mongoose');
const {Schema} = mongoose;
const notificationSchema = new Schema({
    recipient : {  //Id of teacher to which it belongs
        type : mongoose.Schema.Types.ObjectId,
        ref : 'teacher',
        required : true
    },
    recipientName:{
        type: String,
        required : true,
    },
    title : {
        type : String
    },
    typeOf : {
        type : String,
        enum : ['newAssignment','newContent','accessRequest_approved'],
        required : true
    },
    assignment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'assignment'
    },
    content :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'content'
    },
    accessReq_approved : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'AccessRequest'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

notificationSchema.index({createdAt : -1});
const Notifications = mongoose.model('Notifications',notificationSchema);
module.exports = Notifications;

