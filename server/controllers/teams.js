

var Team = require('mongoose').model('Team')
  ;

exports.list = function(req, res) {
  if(req.query.page) {
    console.log('list teams with pagination');
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Team.find({}).skip((page-1)*per).limit(per).exec(function(err, teams) {
      if(err || !teams) {
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , teams: teams
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    console.log('list teams');
    Team.find({}).exec(function(err, teams) {
      if(err || !teams) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, teams: teams });
      }
    });
  }
}

exports.getById = function(req, res) {
  console.log("GET TEAM BY ID");
  console.log(req.params.id);
  Team.findById(req.params.id).populate("headcoach").exec(function(err, team) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!team) {
      res.send({ success: false, message: "no team found :(" });
    } else {
      res.send({ success: true, team: team });
    }
  });
}

exports.getByCoach = function(req, res) {
  console.log('get team by coach');
  Team.findOne({ headcoach: req.param('userid')}).exec(function(err, team) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!team) {
      res.send({ success: false, message: "no team found :(" });
    } else {
      res.send({ success: true, team: team });
    }
  });
}

exports.create = function(req, res) {
  var team = new Team({});
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      team[k] = req.body[k];
    }
  }
  console.log(req.body);
  team.save(function(err, team) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!team) {
      res.send({ success: false, message: "Could not create team :(" });
    } else {
      console.log("created new team");
      res.send({ success: true, team: team });
    }
  });
}

exports.update = function(req, res) {
  console.log("update team called");
  console.log(req.body);
  Team.findById(req.params.id).exec(function(err, team) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!team) {
      res.send({ success: false, message: "Team Not Found. Edit Failed." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          team[k] = req.body[k];
        }
      }
      // now edit the updated date
      team.updated = new Date();
      team.save(function(err, team) {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!team) {
          res.send({ success: false, message: "Could not save team :(" });
        } else {
          res.send({ success: true, team: team });
        }
      });
    }
  });
}

exports.delete = function(req, res) {
  console.log("deleting team");
  Post.findById(req.params.id).remove(function(err) {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted team."});
    }
  });
}
