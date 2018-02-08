 
let minutes = require('./minutes');
const mongoose = require('mongoose');
var id = 1;
var generator = function(){

	let db = mongoose.connection;
	// minutes
	var today = new Date();
	var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
	var nr = Math.floor(Math.random() * 100) + 1;

	var item = new minutes({
		min_id: id,
	 	numberOfCars: nr,
	 	timestamp: myToday,
	 	eq_id: 1
	});
	item.save(function(error){
		console.log('u ruajt');
		console.log(JSON.stringify(item));
		if(error){
			console.log(error);
		}
	});

	id = id +1;
	// console.log(JSON.stringify(item));
	// minutes.create(item, function(err, result){});
};

setInterval(generator, 2 * 60 * 1000);
module.exports = generator;