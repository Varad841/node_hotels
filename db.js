const mongoose = require('mongoose');   //Step 1   
require('dotenv').config();

//Define the mongo db URL               step 2
//const mongoURL = process.env.DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;

//Setup mongo db connection       Step 3
mongoose.connect(mongoURL, {});

//get the default connection       Step 4
//Mongoose maintains a default connection object represnting the mongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection    Step 5
db.on('connected',()=>{
    console.log('Connect succesfully!')
});

db.on('error',(err)=>{
    console.error('Error occured in DB', err)
});

db.on('disconnectd',()=>{
    console.log('Disconnected from DB');
});

//export the databse connection
module.exports = db;    //step 6

