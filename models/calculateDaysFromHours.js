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
	

	/*var cursor = hours.find({'eq_id': 1}).cursor();
		cursor.on('data', function(doc) {
  		// Called once for every document
  		sum = sum + doc['numberOfCars'];
  		console.log('Number of cars: ' + doc['numberOfCars']);
  		console.log(sum);
	});
	cursor.on('close', function() {
  		// Called when done
	});*/

	db.collection('hours').find().toArray(function(err, docs) {
    	console.log("hours:" + JSON.stringify(docs));
    	for(var i = 0; i < docs.length; i++){
    		sum = sum + docs['numberOfCars'];
    		console.log('Number of cars: ' + docs['numberOfCars']);
    	}
	});


	/*var last_element = db.collection('hours').find({}).sort({_id:-1}).limit(1);
    // check that it's not empty
    if (last_element.hasNext()) {
        // print its timestamp
        console.log('se di ca eshte ' + JSON.stringify(last_element.next().hour_id));
    } */

   console.log('Sum: ' + sum);

   var item = {
		day_id: id,
	 	numberOfCars: sum,
	 	timestamp: myToday,
	 	eq_id: 1
	};
	id = id + 1;
	console.log('hour comp: ' + JSON.stringify(item));

	days.create(item, function(err, result){});
	db.collection('days').find().toArray(function(err, docs) {
    	console.log("days:" + JSON.stringify(docs));
	});

	db.collection('hours').find().toArray(function(err, docs) {
    	console.log("hours after deletion:" + JSON.stringify(docs));
	});
}	
setInterval(dayCalc, 20000);
module.exports = dayCalc;