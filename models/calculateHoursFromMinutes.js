// calculate number of cars per hour
// create an hour object
// insert the object to hours document
// delete recent documents from minutes collection

let minutes = require('./minutes');
let equipments = require('./equipments');
let hours = require('./hours');
const mongoose = require('mongoose');

var sum = 0;
var id = 1;

var hourCalc = function calculate(){
	let db = mongoose.connection;
	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());


	// loop all equipments
	// for each equipment
	//    sum of number of cars per hour 
	//    create an hour document
	//    delete last 30 documents
	var eqs = [];

	equipments.find({}, [], function(err, equipments){
        if(err){
        	console.log('error');
        }
        console.log("eq" + JSON.stringify(equipments))
	});

	var c = equipments.find({ }).cursor();
	c.on('data', function(doc){
		eqs.push(doc);
		console.log("DOC" + JSON.stringify(doc))
	});

	c.on('close', function() {
		// Called when done
	});

	/*equipments.find({}, function(err, equipments){
        if(err){
        	console.log('error');
        }
        console.log("eq" + JSON.stringify(equipments))
        eqs = equipments
	});*/



	eqs.forEach(function(d, ind){
	 	console.log(d.eq_id)
		var cursor = minutes.find({ "eq_id": d.eq_id }).cursor();
		cursor.on('data', function(doc) {
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
		 	eq_id: d.eq_id
		});

	   	item.save(function(error){
	   		console.log("hours saved!");
	   		console.log("HOUR: __" + JSON.stringify(item));
	   	});
		id = id + 1;

		minutes.remove({'eq_id': 1}).exec();
		
		console.log(JSON.stringify(minutes));
	})
}	
setInterval(hourCalc,  1000);
module.exports = hourCalc;