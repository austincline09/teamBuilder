


var teams = require('../../controllers/teams');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/teams'              , teams.create);

  // - Read
  router.get('/api/teams'               , teams.list);
  router.get('/api/teams/byCoach/:userid'  , teams.getByCoach);
  router.get('/api/teams/:id'           , teams.getById);


  // - Update
  router.put('/api/teams/:id'           , teams.update); // must login as post owner to update the post

  // - Delete
  router.delete('/api/teams/:id'        , requireRole('admin'), teams.delete); // must be an 'admin' to delete

}
