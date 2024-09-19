const express = require('express');
const {body,validationResult} = require('express-validator');
const Content = require('../Hubmodels.js/Content');
const Assignments = require('../Hubmodels.js/AssignmentSchema');
const Teacher = require('../Hubmodels.js/Teacher')
const accessReqModel = require('../Hubmodels.js/accesReqSch');
const HubfetchStudent = require('../middleware/HubfetchStudent');
const router = express.Router();
const mongoose = require('mongoose');
const AccessRequest = require('../Hubmodels.js/accesReqSch');

// Route1 : Student can download the material uploaded by the teacher: Get /api/Scontent/ ... Login required

router.get('/downloadMaterial/:id',HubfetchStudent,async(req,res)=>{
    try{
        const content = await Content.findById(req.params.id);
 
       if(!content){
            return res.status(404).send('Content Not Found')
        }
        if(content.material.data && content.material.mimetype){
            res.setHeader('Content-Type',content.material.mimetype);
            return res.status(200).send(content.material.data);
        }
    } catch(error){
        console.log(error.message);
        return res.status(500).send({error:'Internal Server Error',message:error.message})
    }
})

//Route 2: Student can fetch all the material of the teacher they searched for by entering their name: Get /api/Scontent ...login required

router.get('/fetchTMaterials/:name',HubfetchStudent,async(req,res)=>{
    try{
        let reqTeacher = await Teacher.findOne({name:new RegExp(req.params.name, 'i')});
        if (!reqTeacher) {
            return res.status(404).send('Teacher not found');
        }
        let material = await Content.find({teacher:reqTeacher._id}) ;
        if(!material || material.length === 0){
            return res.status(404).send({message : 'No content to display'})
        }
        return res.status(200).send({material});
    } catch(error){
        console.log(error.message);
        return res.status(500).send({error:'Internal server error',error:error.message})
    }
})

//Route 3: Api for reccomandations of teachers for a query value using...Get /api/Scontent ...login required
router.get('/searchTeachers/:query',HubfetchStudent,async(req,res) =>{
    try{
        const query = req.params.query;
        const regex = new RegExp('^'+query,'i');
        const teachers = await Teacher.find({name : regex});
        if(teachers){
            res.status(200).json(teachers);
        } else {
            res.status(200).json([]);
        }
    } catch(error){
        console.error('Error in searching teachers',error);
        res.status(500).json({error:'Internal server error'});
    }
});

//Route 4 Api to fetch both assignments and contents upload by a selected teacher of which student have access..using : GET /api/Scontent....login Required

router.get('/getAllContentST/:id',HubfetchStudent,async(req,res)=>{
    try{
        let allContentReq = [];
        const studentId = req.student.id;
        const teacherId = req.params.id;
        const accReq = await AccessRequest.findOne({student: studentId, teacher: teacherId});
        if(!accReq || accReq.status !== 'approved'){
            return res.status(404).send({success:false,message:'Sorry access request not found...',accessRequest : 'Content access denied'})
        } 
        const ass = await Assignments.find({teacher:teacherId});
        allContentReq.push(...ass);

        return res.status(200).send({success:true,requiredContent:allContentReq});
    } catch(error){
        console.error('Error in routing',error);
        return res.status(500).message({success:false,error:'Internal Server error..'})
    }
})

//Route 5 API to fetch content and assignements of all the teacher Student have access to..using: GET /api/Scontent...

router.get('/getAllContent',HubfetchStudent,async(req,res)=>{
    try{
        let allContent = [];
        const studentId = req.student.id;
        const approvedStatusdocs = await AccessRequest.find({status:'approved',student:studentId});
        if(approvedStatusdocs.length === 0){
            return res.status(404).send({success:false,message:'There are no approved requests...',reqMaterial:'nothing'})
        }
        const approvedTeachersId = approvedStatusdocs.map((request) => request.teacher);
        for (const teacherId of approvedTeachersId) {
            const assignments = await Assignments.find({ teacher: teacherId });
            allContent.push(...assignments);
        }
        return res.status(200).send({success:true,reqMaterial:allContent})
    } catch(error){
        console.error('Error in routing',error);
        return res.status(500).send({message:'Internal server error',error:error});
    }
})

module.exports = router;