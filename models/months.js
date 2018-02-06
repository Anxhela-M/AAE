let mongoose = require('mongoose');


// Equipment schema

let monthSchema = mongoose.Schema({
   month_id: {
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

let Month = module.exports = mongoose.model('Month',monthSchema);