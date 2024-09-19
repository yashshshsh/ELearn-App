const express = require('express');
const Student = require('../Hubmodels.js/Student');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = `Yash you are genius!!!`;
const HubfetchStudent = require('../middleware/HubfetchStudent');
const upload = require('../middleware/upload')

//Route1 : Create a user Student using: Post '/api/authStudent'. It doesnot require authentication
router.post('/createuser',upload.single('photo'),[
    body('name','Your newName must be at least 3 characters long').isLength({min:3}),
    body('email','Should be a valid email').isEmail(),
    body('mobile_no','Enter a valid mobile number').isLength({min:10}),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 characters long').matches(/[A-Z]/).withMessage('Password must contain atleast one uppercase character'),
],async(req,res)=>{
    let success = false 
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({success, errors : errors.array()})
        }
        let student = await Student.findOne({email:req.body.email});
        if(student){
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

        student = await Student.create({
            name: req.body.name,
            email:req.body.email,
            mobile_no:req.body.mobile_no,
            password: Secret_pass,
            photo:{
                data: photoData,
                contentType: photoContentType
            },
            enrollment_no : req.body.enrollment_no,
        })

        const data = {
            student:{
                id: student._id,
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

//Route 2: Authenticate the user using: POST api/authStudent

router.post('/loginStudent',[
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
        let student = await Student.findOne({email});
        if(!student){
            success = false;
            return res.status(400).json({success,error:'Please try again with the correct credentials'})
        }
        const passwordCompare = await bcrypt.compare(password,student.password);
        if(!passwordCompare){
            return res.status(200).json({error : "Please enter the correct credentials"})
        }
        const data = {
            student:{
                id: student._id
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

//Route 3 :Get loggedin User details using: GET api/authStudent...Login required

router.get('/getStudent',HubfetchStudent,async(req,res)=>{
    try{
        const StudentId = req.student.id;
        const student = await Student.findById(StudentId).select('-password');
        if(!student){
            return res.status(400).json({error:"User not found"})
        }
        res.status(200).send(student)
    } catch(error){
        console.log(error.message);
        res.status(400).send({error:'Internal Server error',message:error.message})
    }
})

//Route 4 : Update the the loggedin user details: PUT api/authStudent .... Login required

router.put('/updateStudent/:id',async(req,res)=>{
    const {name,email,mobile_no,enrollment_no} = req.body;
    try{
        let user = await Student.findById(req.params.id);
        if(name) user.name = name;
        if(email) user.email = email;
        if(mobile_no) user.mobile_no = mobile_no;
        if(enrollment_no) user.enrollment_no = enrollment_no;
        user = await user.save();
        res.status(200).send({user});
    } catch(error){
        console.log({message:error.message});
        res.status(400).send({error:'Internal Server error',message:error.message})
    }
});

module.exports = router;