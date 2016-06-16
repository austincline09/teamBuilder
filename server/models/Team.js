//Team

var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  ;

// define team schema
var productSchema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , teamname:               { type: String, required: '{PATH} is required!' }
  , headcoach:              { type: ObjectId, ref:'User' }
  , teamimage:              { type: String }
});


Team = mongoose.model('Team', productSchema);
