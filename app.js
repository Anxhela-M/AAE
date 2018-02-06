const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Models
let equipment = require('./models/equipment');
let minutes = require('./models/minutes');
let hours = require('./models/hours');
let days = require('./models/days');
let months = require('./models/months');


// CONNECT TO MONGODB DATABASE
mongoose.connect('mongodb://localhost/aae');
let db = mongoose.connection;

// check connection
db.once('open', function(){
   console.log('Connected to MongoDB.');
});

// check for db errors
db.on('error', function(err){
   console.log(err);
});



app.get('/', function(req, res){
	res.send("Helloo world");
	equipment.find({}, function(err, equipments){
        if(err){
        	console.log('error');
        }
        res.write(equipments);
	});
});

app.listen(3000, function(){
	console.log('Server started on port 3000 ... ');
});