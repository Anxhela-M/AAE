
module.exports = function connectToDB(){
	const mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/aae');
	let db = mongoose.connection;

	// check connection
	db.once('open', function(){
   		console.log('Connected to MongoDB.');
	});

	// check for db errors
	db.on('error', function(err){
   		console.log(err);
	});
}


