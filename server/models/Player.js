//Player


var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  ;
// define player schema
var productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , firstname:              { type: String, required: '{PATH} is required!' }
  , lastname:               { type: String, required: '{PATH} is required!' }
  , playernumber:           { type: String }
  , team:                   { type: ObjectId, ref: 'Team' }
  , playerimage:              { type: String }
});


Player = mongoose.model('Player', productSchema);
