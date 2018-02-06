let mongoose = require('mongoose');


// Equipment schema

let minutesSchema = mongoose.Schema({
   min_id: {
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

let Minute = module.exports = mongoose.model('Minute', minutesSchema);