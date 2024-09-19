const mongoose = require('mongoose');
const {Schema} = mongoose;
const assignmentSchema = new Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    Teacher_name:{
        type:String
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    material:{
        data: Buffer,
        mimeType: String,
    }
})

assignmentSchema.index({teacher:1});
const Assignment = mongoose.model('assignment',assignmentSchema);

module.exports = Assignment;

