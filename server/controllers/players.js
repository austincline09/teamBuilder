

var Player = require('mongoose').model('Player')
  ;

exports.list = function(req, res) {
  if(req.query.page) {
    console.log('list players with pagination');
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Player.find({}).skip((page-1)*per).limit(per).exec(function(err, players) {
      if(err || !players) {
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , players: players
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    console.log('list players');
    Player.find({}).exec(function(err, players) {
      if(err || !players) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, players: players });
      }
    });
  }
}

exports.getById = function(req, res) {
  console.log('get player by id');
  Player.findById(req.params.id).populate("team").exec(function(err, player) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!player) {
      res.send({ success: false, message: "no player found :(" });
    } else {
      res.send({ success: true, player: player });
    }
  });
}

exports.getByTeam = function(req, res) {
  console.log('get player team id');
  Player.find({ teamid: req.param('teamid')}).exec(function(err, player) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!player) {
      res.send({ success: false, message: "no player found :(" });
    } else {
      res.send({ success: true, player: player });
    }
  });
}


exports.create = function(req, res) {
  var player = new Player({});
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      player[k] = req.body[k];
    }
  }
  console.log(req.body);
  player.save(function(err, player) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!player) {
      res.send({ success: false, message: "Could not create player :(" });
    } else {
      console.log("created new player");
      res.send({ success: true, player: player });
    }
  });
}

exports.update = function(req, res) {
  console.log("update player called");
  console.log(req.body);
  Player.findById(req.params.id).exec(function(err, player) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!player) {
      res.send({ success: false, message: "Player Not Found. Edit Failed." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          player[k] = req.body[k];
        }
      }
      // now edit the updated date
      player.updated = new Date();
      player.save(function(err, player) {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!player) {
          res.send({ success: false, message: "Could not save player :(" });
        } else {
          res.send({ success: true, player: player });
        }
      });
    }
  });
}

exports.delete = function(req, res) {
  console.log("deleting player");
  Player.findById(req.params.id).remove(function(err) {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted player."});
    }
  });
}
