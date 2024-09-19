const mongoose = require('mongoose');
const {Schema} = mongoose;
const contentSchema = new Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    Teacher_name:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },  
    description:{
        type:String,
        required:true,
    },
    material:{
        data:Buffer,
        mimetype:String
    }
})

contentSchema.index({ teacher: 1 });
const Content = mongoose.model('content',contentSchema);

// Content.createIndexes();
module.exports = Content;