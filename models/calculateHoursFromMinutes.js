// calculate number of cars per hour
// create a month object
// insert the object to hours document
// delete recent documents from minutes collection

let minutes = require('./minutes');
let hours = require('./hours');
const mongoose = require('mongoose');

console.log('calculating hours...')
var sum = 0;
var id = 1;

var hourCalc = function calculate(){
	let db = mongoose.connection;
	

	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());

/*	var cursor = minutes.find({ }).cursor();
		cursor.on('data', function(doc) {
  		// Called once for every document
  		sum = sum + doc['numberOfCars'];
  		console.log('Number of cars: ' + doc['numberOfCars']);
  		console.log(sum);
	});
	cursor.on('close', function() {
  		// Called when done
	}); */


   db.collection('minutes').find().toArray(function(err, docs) {
    	console.log("minutes:" + JSON.stringify(docs));
    	for(var i = 0; i < docs.length; i++){
    		sum = sum + docs['numberOfCars'];
    		console.log('Number of cars: ' + docs['numberOfCars']);
    	}
 
  		
	});

   console.log('Sum: ' + sum);

   var item = {
		hour_id: id,
	 	numberOfCars: sum,
	 	timestamp: myToday,
	 	eq_id: 1
	};
	id = id + 1;
	hours.create(item, function(err, result){});
	


	/*for(i=0;i<30;i++) {
    	minutes.findAndModify({query :{}, sort: {"_id" : -1}, remove:true})
	}*/

	//minutes.find({'eq_id': 1}).limit(10).remove().exec(function(err, posts){});
	
	db.collection('minutes').find().toArray(function(err, docs) {
    	console.log("minutes after deletion:" + JSON.stringify(docs));
	});
}	
setInterval(hourCalc, 10000);
module.exports = hourCalc;