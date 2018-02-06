let mongoose = require('mongoose');


// Equipment schema

let equipmentSchema = mongoose.Schema({
   eq_id: {
   	  type: Number,
   	  required: true
   },
   eq_address: {
   	  type: Number, 
   	  required: true
   },
   eq_name: {
      type: String,
      required: true
   } 
});

let Equipment = module.exports = mongoose.model('Equipment', equipmentSchema);