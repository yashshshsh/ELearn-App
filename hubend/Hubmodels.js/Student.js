const mongoose = require('mongoose');
const {Schema} = mongoose;
const studentSchema = new Schema({
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
    enrollment_no:{
        type: String,
        required : true,
        unique: true
    },
    photo:{
        data: Buffer,
        mimetype : String,
    },
    mobile_no:{
        type: String,
        required: true,
    }
})

const Student = mongoose.model('student',studentSchema);
module.exports = Student;

 