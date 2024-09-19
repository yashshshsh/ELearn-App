const connectToMongo = require('./Hubdb');
const express = require('express');
var cors = require('cors');
const compression = require('compression');

connectToMongo();

const app = express();
const port = 4512;

app.use(cors())
app.use(express.json())
app.use(compression());

// Available Routes
app.use('/api/authTeacher',require('./Routes/authTeacher'));
app.use('/api/authStudent',require('./Routes/authStudent'));
app.use('/api/Tcontent',require('./Routes/Tcontent'));
app.use('/api/Scontent',require('./Routes/Scontent'));
app.use('/api/assignment',require('./Routes/assignment'));
app.use('/api/accessReq' , require('./Routes/AccessReqRoute'))
app.use('/api/notifications',require('./Routes/NotificationRoute'))

app.listen(port,()=>{
    console.log(`LearnHub is listening at port http://localhost:${port}`);
})