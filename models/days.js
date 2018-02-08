let mongoose = require('mongoose');


// Equipment schema

let daysSchema = mongoose.Schema({
   day_id: {
   	  type: Number,
   	  required: true
   },
   timestamp: {
   	  type: Number, 
   	  required: true
   },
   numberOfCars: {
        type: Number, 
        required: true
   },
   eq_id: {
      type: Number,
      required: true
   } 
});

let Day = module.exports = mongoose.model('Day',daysSchema);