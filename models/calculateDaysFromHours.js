


let hours = require('./hours');
let days = require('./days');
const mongoose = require('mongoose');
console.log('calculating minutes...')
var sum = 0;
var id = 0;
var dayCalc = function calculate(){
	let db = mongoose.connection;
	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
	

	var cursor = hours.find({'eq_id': 1}).cursor();
		cursor.on('data', function(doc) {
  		// Called once for every document
  		sum = sum + doc.numberOfCars;
  		console.log('Number of cars: ' + doc.numberOfCars);
  		console.log(sum);
	});
	cursor.on('close', function() {
  		// Called when done
	});

	console.log("SUM: " + sum);

   	var item = new days({
		day_id: id,
	 	numberOfCars: sum,
	 	timestamp: myToday,
	 	eq_id: 1
	});
	item.save(function(error){
   		console.log("day saved!");
   		console.log("Day: __" + JSON.stringify(item));
   	});
	id = id + 1;
	console.log('day comp: ' + JSON.stringify(item));

	hours.remove({'eq_id': 1}).exec();	
}	
setInterval(dayCalc, 24 * 60 * 60 * 1000);
module.exports = dayCalc;