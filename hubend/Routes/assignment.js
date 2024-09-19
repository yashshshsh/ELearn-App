const express = require('express');
const {body,validationResult} = require('express-validator');
const Assignment = require('../Hubmodels.js/AssignmentSchema');
const HubfetchTeacher = require('../middleware/HubfetchTeacher');
const router = express.Router();
const upload = require('../middleware/upload'); 
const Teacher = require('../Hubmodels.js/Teacher');
const Notifications = require('../Hubmodels.js/NotificationSchema');

//Route 1: Posting assignment by the teacher using : POST /api/assignment...Login required

router.post('/addAss',upload.single('material'),HubfetchTeacher,[
    body('title','Cannot be blank').exists(),
    body('description','Cannot be blank').exists()
],async(req,res)=>{
    try{
        let success = false;
        const {title,description} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send({success,errors:errors.array()})
        }
        const teacherId = req.teacher.id;
        const teacher = await Teacher.findById(teacherId);
        const teacherName = teacher.name;
        let materialData = null;
        let materialMimeType = null;
        if(req.file){
            materialData = req.file.buffer;
            materialMimeType = req.file.mimetype
        }

        const assignmentIO = new Assignment({
            title,description,
            material:{
                data:materialData,
                mimeType:materialMimeType,
            },
            teacher:req.teacher.id,
            Teacher_name:teacherName
        })

        const notification = new Notifications({
            recipient : teacherId,
            typeOf : 'newAssignment',
            assignment : assignmentIO._id,
            recipientName : teacherName,
            title : title
        })
        const savedAss = await assignmentIO.save();
        const newNotification = await notification.save();
        res.status(200).send({savedAss,newNotification})
    } catch(error){
        console.log(error.message);
        res.status(400).send({error:'Internal Server Error',message:error.message})
    }
})

//Route 2 : Deleting the Assignment uploaded by the teacher using:Delete /api/assignment...Login required

router.delete('/deleteAss/:id',HubfetchTeacher,async(req,res)=>{
    try{
        let ass = await Assignment.findById(req.params.id);
        console.log(ass);
        console.log('req.teacher',req.teacher);
        if(!ass){
            res.status(400).send({error:'Assignment not found'});
        }
        if(ass.teacher.toString() !== req.teacher.id){
            res.status(403).send({error:'Not allowed'});
        }
        ass = await Assignment.findByIdAndDelete(req.params.id);
        res.status(200).send({'Success' : 'Assignment deleted succesfully',deleted_ass : ass})
    } catch(error){
        res.status(400).send({error:'Internal server error',messsage:error.message})
    }
})

//Route 3 : Getting all the assignments by : Get /api/assignment .... Login required

router.get('/getAss',HubfetchTeacher,async(req,res)=>{
    try{
        let success = true;
        const ass = await Assignment.find({teacher:req.teacher.id});
        res.status(200).send({success,ass})
    } catch(error){
        success = false;
        res.status(400).send({success,error:'Internal server error',message:error.message})
    }
})

module.exports = router;