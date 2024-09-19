const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccessRequest = require('../Hubmodels.js/accesReqSch');
const Student = require('../Hubmodels.js/Student');
const Teacher = require('../Hubmodels.js/Teacher');
const Notifications = require('../Hubmodels.js/NotificationSchema');
const HubfetchStudent = require('../middleware/HubfetchStudent');
const HubfetchTeacher = require('../middleware/HubfetchTeacher');

//Route 1: Create a new access request using : POST /api/accessReq 
router.post('/addaccess_req', HubfetchStudent, async (req, res) => {
    const { teacherId } = req.body;
    const studentId = req.student.id;
    try {
        const validTeacherId = new mongoose.Types.ObjectId(teacherId);
        const existingReq = await AccessRequest.findOne({ student: studentId, teacher: validTeacherId });
        if (existingReq) {
            return res.status(400).send({ message: 'Access request already exist' })
        }
        const student = await Student.findById(studentId);
        const teacher = await Teacher.findById(teacherId);
        if (!student || !teacher) {
            return res.status(404).send({ message: 'Student or teacher not found' });
        }
        const accessRequest = new AccessRequest({
            student: studentId,
            teacher: validTeacherId,
            status: 'pending',
            Student_name: student.name,
            Teacher_name: teacher.name
        });
        await accessRequest.save();
        res.status(200).send({ message: 'Access request successfully created', accessRequest: accessRequest })
    } catch (error) {
        console.error('Error in creating access request', error);
        res.status(500).send({ message: 'Internal Server Error', error: error })
    }
})

//Route 2 : Approving an access request using : PUT /api/accessReq...from teacher's end
router.put('/approve_accessReq/:id', HubfetchTeacher, async (req, res) => {
    const teacherId = req.teacher.id;
    try {
        const accessRequest = await AccessRequest.findById(req.params.id);
        if (!accessRequest) {
            return res.status(400).send({ message: 'Access request not found' })
        }
        if (accessRequest.teacher.toString() != teacherId) {
            return res.status(400).send({ message: 'Unauthorised' });
        }
        const teacherName = await Teacher.findById(teacherId).name
        accessRequest.status = 'approved';
        await accessRequest.save();

        const notification = new Notifications({
            recipient : teacherId,
            typeOf : 'accessRequest_approved',
            accessReq_approved : req.params.id,
            recipientName: teacherName
        })

        await notification.save();
        return res.status(200).send({ message: 'Access request status updated successfully',status:'approved',notification})
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: 'Internal server error', error: error });
    }
})

//Route 3: Cancelling an access request using : Delete /api/accessReq ....from student's end
router.delete('/cancel_accessReq', HubfetchStudent, async (req, res) => {
    let success = false;
    const studentId = req.student.id;
    const { teacherId } = req.body;
    try {
        let accessReq = await AccessRequest.findOne({ student: studentId, teacher: teacherId });
        // console.log('accessReq', accessReq);
        if (!accessReq) {
            return res.status(404).send({ success, message: "Access request doesn't exist" })
        }
        accessReq = await AccessRequest.findOneAndDelete({ student: studentId, teacher: teacherId });
        success = true;
        return res.status(200).send({ success, DeletedAccessReq: accessReq });
    } catch (error) {
        console.error('error', error);
        return res.status(500).send({ success: false, error: 'Internal server error' });
    }
})

//Route 4: Fetch all the access request of Teacher in teacher's port using: GET /api/accessReq

router.get('/fetchAllreq', HubfetchTeacher, async (req, res) => {
    const teacherId = req.teacher.id;
    let success = true;
    try {
        let allReq = await AccessRequest.find({ teacher: teacherId });
        if (allReq.length === 0) {
            return res.status(200).send({ success, message: 'Sorry,No access request found for this teacher' })
        }
        res.status(200).send({ success, accessRequests: allReq })
    } catch (error) {
        console.error('error', error);
        res.status(500).send({ error: 'Internal server error', error: error.message })
    }
})

//Route 5: Fetch an accessRequest using : GET /api/accessReq

router.get('/fetchReq/:Teacherid',HubfetchStudent,async(req,res)=>{
    const teacherId = req.params.Teacherid;
    const studentId = req.student.id;
    try{
        const requiredReq = await AccessRequest.find({student:studentId,teacher:teacherId});
        if(!requiredReq){
            return res.status(500).send({success:false,requiredReq:'',message:'Sorry!! Access request doesnot exist'});
        }
        return res.status(200).send({success:true,required_req:requiredReq});
    } catch(error){
        console.error('error',error);
        return res.status(500).send({success:false,error:'Internal server error'})
    }
})

//Route 6: Delete an accessRequest using : Delete /api/accessReq

router.delete('/delete_accessReq/:id',HubfetchTeacher,async(req,res)=>{
    try{
        let requiredReq = await AccessRequest.findById(req.params.id);
        if(!requiredReq){
            return res.status(500).send({success:false,message:'Sorry!! Access request doesnot exist...'});
        }
        requiredReq = await AccessRequest.findByIdAndDelete(req.params.id);
        return res.status(200).send({success:true,DeletedReq:requiredReq});
    } catch(error){
        console.error('error',error);
        return res.status(500).send({success:false,error:'Internal server error'});
    }
})

//Route 7:Access all the approved access request of a student using : GET /api/accessReq

router.get('/fetchAllStureq', HubfetchStudent, async (req, res) => {
    const studentId = req.student.id;
    try {
        let allReq = await AccessRequest.find({ student: studentId });
        if (allReq.length === 0) {
            return res.status(200).send({ success:false,accessRequests:[], message: 'Sorry,No access request found for this student' })
        }
        res.status(200).send({ success:true, accessRequests: allReq })
    } catch (error) {
        console.error('error', error);
        res.status(500).send({ error: 'Internal server error', error: error.message })
    }
})

module.exports = router;