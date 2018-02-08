let mongoose = require('mongoose');


// Equipment schema

let hoursSchema = mongoose.Schema({
   hour_id: {
   	  type: Number,
   	  required: true
   },
   timestamp: {
   	  type: String, 
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

let Hour = module.exports = mongoose.model('Hour', hoursSchema);