


let months = require('./months');
let days = require('./days');
const mongoose = require('mongoose');
var sum = 0;
var id = 0;

var monthCalc = function calculate(){
	let db = mongoose.connection;
	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
	

	var cursor = months.find({'eq_id': 1}).cursor();
		cursor.on('data', function(doc) {
  		// Called once for every document
  		sum = sum + doc.numberOfCars;
	});
	cursor.on('close', function() {
  		// Called when done
	});

	console.log("SUM: " + sum);

   	var item = new months({
		day_id: id,
	 	numberOfCars: sum,
	 	timestamp: myToday,
	 	eq_id: 1
	});
	item.save(function(error){
   		console.log("day saved!");
   		console.log("Month: __" + JSON.stringify(item));
   	});
	id = id + 1;
	console.log('month comp: ' + JSON.stringify(item));

	days.remove({'eq_id': 1}).exec();	
}	
setInterval(dayCalc, 24 * 60 * 60 * 1000);
module.exports = dayCalc;