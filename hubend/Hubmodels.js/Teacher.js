const mongoose = require('mongoose');
const {Schema} = mongoose;
const teacherSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        requird : true,
        unique: true,
    },
    photo:{
        data: Buffer,
        mimetype : String,
    },
    mobile_no:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
})

const Teacher = mongoose.model('teacher',teacherSchema); // Here Teacher is a model
// Teacher.createIndexes();
module.exports = Teacher;