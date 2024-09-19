var jwt = require('jsonwebtoken');
const JWT_Secret = `Yash you are genius!!!`;    

const HubfetchStudent = (req,res,next) =>{
    const token = req.header('authToken');
    if(!token){
        res.status(400).send({error:'Token is not available'})
    }
    try{
        const decoded = jwt.verify(token,JWT_Secret);
        req.student = decoded.student;
        next();
    } catch(error){
        console.log({error:'Please send a valid token'})
    }
}

module.exports = HubfetchStudent;