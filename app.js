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
let equipment = require('./models/equipment');
let minutes = require('./models/minutes');
let hours = require('./models/hours');
let days = require('./models/days');
let months = require('./models/months');

const app = express();

// CONNECT TO MONGODB DATABASE
db_connection();
db_generator();


//const minutesData = require('./models/getMinutesData.js')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')))

// routes

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/getData', function(req, res){
	//res.send("Helloo world");
	minutes.find({}, function(err, minutes){
        if(err){
        	console.log('error');
        }
        res.json(minutes);
	});
});


app.get('/getHoursData', function(req, res){
	//res.send("Helloo world");
	hours.find({}, function(err, hours){
        if(err){
        	console.log('error');
        }
        res.json(hours);
	});
});

app.get('/getDailyData', function(req, res){
	//res.send("Helloo world");
	days.find({}, function(err, days){
        if(err){
        	console.log('error');
        }
        res.json(days);
	});
});

app.get('/minutes', function(req, res){
	// res.send("Helloo minutes");
	/*db.minutes.find({"eq_id": 1}, function(err, minutes){
    	res.send(JSON.stringify(minutes));
    });*/
   // res.send(minutesData());
   let db = mongoose.connection;
   minutes.find({'eq_id': 1}, function(err, minutes){
    	if(err){
        	console.log('error');
    	}
    	if(minutes != null){
    		console.log("minutes to display: " + JSON.stringify(minutes));
    	res.send(JSON.stringify(minutes));
    	}
    	
    });
});


app.listen(3000, function(){
	console.log('Server started on port 3000 ... ');
});