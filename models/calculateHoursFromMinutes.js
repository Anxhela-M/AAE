// calculate number of cars per hour
// create an hour object
// insert the object to hours document
// delete recent documents from minutes collection

let minutes = require('./minutes');
let hours = require('./hours');
const mongoose = require('mongoose');
var async = require('async');

var sum = 0;
var id = 1;

var hourCalc = function calculate(){
	let db = mongoose.connection;
	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());

	var cursor = minutes.find({ }).cursor();
		cursor.on('data', function(doc) {
  		// Called once for every document
  		sum = sum + doc.numberOfCars;
  		// console.log('Number of cars: ' + doc.numberOfCars);
	});
	cursor.on('close', function() {
  		// Called when done
	});

	console.log("SUM: " + sum);

   	var item = new hours({
		hour_id: id,
	 	numberOfCars: sum,
	 	timestamp: myToday,
	 	eq_id: 1
	});

   	item.save(function(error){
   		console.log("hours saved!");
   		console.log("HOUR: __" + JSON.stringify(item));
   	});
	id = id + 1;

	minutes.remove({'eq_id': 1}).exec();
	
	console.log(JSON.stringify(minutes));
}	
setInterval(hourCalc, 60 * 60 * 1000);
module.exports = hourCalc;