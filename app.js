const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db_connection = require('./models/db_connection.js')
const db_generator = require('./models/generator.js')
const min_calculator = require('./models/calculateHoursFromMinutes.js')
const hour_calculator = require('./models/calculateDaysFromHours.js')
const ejs = require('ejs')

// Models
let equipments = require('./models/equipment');
let minutes = require('./models/minutes');
let hours = require('./models/hours');
let days = require('./models/days');
let months = require('./models/months');

const app = express();

// CONNECT TO MONGODB DATABASE
db_connection();
db_generator();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))

// routes

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/api/getData', function(req, res){
	var q = minutes.find({}).limit(30);
	q.find({}, function(err, minutes){
        if(err){
        	console.log('error');
        }
        res.json(minutes);
	});
});

app.get('/api/getLastMinute', function(req, res){
	var q = minutes.find({}).limit(1);
	q.exec(function(err, minutes){
        if(err){
        	console.log('error');
        }
        res.json(minutes);
	});
});

app.get('/api/getHoursData', function(req, res){
	var q = hours.find({}).limit(24);
	q.exec(function(err, hours){
        if(err){
        	console.log('error');
        }
        res.json(hours);
	});
});

app.get('/api/getDailyData', function(req, res){
	var q = days.find({}).limit(30);
	q.find({}, function(err, days){
        if(err){
        	console.log('error');
        }
        res.json(days);
	});
});

app.get('/api/getEquipments', function(req, res){
	equipments.find({}, function(err, equipments){
        if(err){
        	console.log('error');
        }
        console.log("eq" + equipments)
        res.json(equipments);
	});
});

app.get('/api/getMonthlyData', function(req, res){
	var q = months.find({}).limit(12);
	q.find({}, function(err, months){
        if(err){
        	console.log('error');
        }
        res.json(months);
	});
});

app.listen(3000, function(){
	console.log('Server started on port 3000 ... ');
});