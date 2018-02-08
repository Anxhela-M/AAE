const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db_connection = require('./models/db_connection.js')
const db_generator = require('./models/generator.js')
const min_calculator = require('./models/calculateHoursFromMinutes.js')
const hour_calculator = require('./models/calculateDaysFromHours.js')

// Models
let equipment = require('./models/equipment');
let minutes = require('./models/minutes');
let hours = require('./models/hours');
let days = require('./models/days');
let months = require('./models/months');

const app = express();

// CONNECT TO MONGODB DATABASE
db_connection();
db_generator();

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