const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cubetimer',
{ useNewUrlParser: true },()=>{
   console.log("Database connected");
});
mongoose.Promise = global.Promise;

const timerRoutes = require('./api/routes/timers');


app.use('/timer',timerRoutes);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status =404;
    next(error);
 });
 
 app.use((error,req,res,next)=>{
   res.status(error.status || 500);
   res.json({
     error:{
       message:error.message
     }
   });
 });
 
 module.exports = app;