const express = require('express');
const Teacher = require('../Hubmodels.js/Teacher');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = `Yash you are genius!!!`;
const HubfetchTeacher = require('../middleware/HubfetchTeacher');
const upload = require('../middleware/upload')

//Route1 : Create a user Teacher using: Post '/api/authTeacher'. It doesnot require authentication
router.post('/createuser',upload.single('photo'),[
    body('name','Your name must be at least 3 characters long'),
    body('email','Should be a valid email').isEmail(),
    body('mobile_no','Enter a valid mobile number').isLength({min:10}),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 characters long').matches(/[A-Z]/).withMessage('Password must contain atleast one uppercase character'),
],async(req,res)=>{
    let success = false;
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({success, errors : errors.array()})
        }
        let teacher = await Teacher.findOne({email:req.body.email});
        if(teacher){
            return res.status(400).send({success,error:'Sorry a user with this email already exist'})
        }  

        const salt = await bcrypt.genSalt(10);
        const Secret_pass = await bcrypt.hash(req.body.password,salt);

        let photoData = null;
        let photoContentType = null;
        if(req.file){
            photoData = req.file.buffer;
            photoContentType = req.file.mimetype;
        }

        teacher = await Teacher.create({
            name: req.body.name,
            email:req.body.email,
            mobile_no:req.body.mobile_no,
            password: Secret_pass,
            photo:{
                data: photoData,
                contentType: photoContentType
            },
            subject: req.body.subject
        })

        const data = {
            teacher:{
                id: teacher._id
            }
        }

        const authToken = jwt.sign(data,JWT_Secret);
        success = true;
        res.status(200).json({success,authToken})
    } catch(error){
        res.status(400).json({error:'Internal Server Error',message:error.message})
    }
});

module.exports = router;

//Route 2: Authenticate the user using: POST api/authTeacher

router.post('/loginTeacher',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {email,password} = req.body;
    try{
        let teacher = await Teacher.findOne({email});
        if(!teacher){
            success = false;
            return res.status(400).json({success,error:'Please try again with the correct credentials'})
        }
        const passwordCompare = await bcrypt.compare(password,teacher.password);
        if(!passwordCompare){
            return res.status(200).json({error : "Please enter the correct credentials"})
        }
        const data = {
            teacher:{
                id: teacher._id
            }
        }
        const authToken = jwt.sign(data,JWT_Secret);
        success = true;
        res.json({success,authToken})
    } catch(error){
        console.log(error.message);
        return res.status(400).json({error:"Internal server error",message:error.message});
    }
})

//Get loggedin User details using: GET api/authTeacher...Login required

router.get('/getUser',HubfetchTeacher,async(req,res)=>{
    try{
        const teacherId = req.teacher.id;
        const teacher = await Teacher.findById(teacherId).select('-password');
        if(!teacher){
            return res.status(400).json({error:"User not found"})
        }
        res.status(200).send(teacher)
    } catch(error){
        console.log(error.message);
        res.status(400).send({error:'Internal Server error',message:error.message})
    }
})

//Update the the loggedin user details: PUT api/authTeacher .... Login required

router.put('/updateUser/:id', upload.single('photo'),HubfetchTeacher,async(req,res)=>{
    const {newName,newEmail,newMobile_no,newSubject} = req.body;
    try{
        let user = await Teacher.findById(req.params.id);
        if(newName) user.name = newName;
        if(newEmail) user.email = newEmail;   
        if(newMobile_no) user.mobile_no = newMobile_no;
        if(newSubject) user.subject = newSubject;

        if (req.file) {
            // Assuming 'photo' is the name of the file input field
            user.photo = req.file.photo; // Save the file path to the user's photo field
        }
        user = await user.save();
        console.log(user)
        res.status(200).send({user});
    } catch(error){
        console.log({message:error.message});
        res.status(400).send({error:'Internal Server error',message:error.message})
    }
});

module.exports = router;