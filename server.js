const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//config loading
const config = require('./config/databse');

//database connection
mongoose.connect(config.database, (err)=>{
    if(err)
        console.log(err);
    else
        console.log('DB connected successfully');
});

//PORT

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Load routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log('SERVER LISTENING ON PORT '+ PORT);
})