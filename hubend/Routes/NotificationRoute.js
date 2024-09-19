const express = require('express')
const Notifications = require('../Hubmodels.js/NotificationSchema');
const HubfetchStudent = require('../middleware/HubfetchStudent');
const AccessRequest = require('../Hubmodels.js/accesReqSch');
const router = express.Router();

//Route 1 Api for getting all the notifications in students section using : GET /api/notifications

router.get('/getAllNotifications',HubfetchStudent,async(req,res)=>{
    try{
        const studentId = req.student.id;
        const accessReq = await AccessRequest.find({student : studentId , status:'approved'});

        if(accessReq.length === 0){
            return res.send({success:true,message : 'Sorry no accessRequest available' , notificationsRequired : []})
        }
        const teachersAvailable = accessReq.map((req) => { return req.teacher});

        const notifications = await Promise.all(
            teachersAvailable.map(async(teacher) =>{
                return await Notifications.find({recipient:teacher})
            })
        )

        const flattendNotifications = notifications.flat();//will flatten the array of arrays into single array of notifications
        
        if(flattendNotifications.length === 0){
            return res.status(200).send({success:true,message:'Sorry no notification available',notificationsRequired : []})
        }

        res.status(200).send({success:true,notificationsRequired : flattendNotifications});

        // const notifications = [];
        // for(let teacher of teachersAvailable){
        //     let notify = await Notifications.find({recipient : teacher});
        //     notifications.push(...notify);
        // }
    } catch(error){
        console.error({error:error});
        return res.status(500).send({message:'Internal server error',error:error.message})
    }
})

module.exports = router;