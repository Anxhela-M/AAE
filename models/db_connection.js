
 var connectToDB = function(){
	const mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/aae');
	let db = mongoose.connection;

	// check connection
	db.once('open', function(){
   		console.log('Connected to MongoDB.');
   		db.createCollection('minutes');
		db.createCollection('hours');
		db.createCollection('days');
		db.createCollection('months');
		db.createCollection('equipments');
	});

	// check for db errors
	db.on('error', function(err){
   		console.log(err);
	});
};

module.exports = connectToDB;
