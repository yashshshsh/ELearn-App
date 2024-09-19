const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/LearnHub";

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
    console.log("LearnHub is successfully connected to the mongo");
}

module.exports = connectToMongo;