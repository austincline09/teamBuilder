

var players = require('../../controllers/players');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/players'              , players.create);

  // - Read
  router.get('/api/players'               , players.list);
  router.get('/api/players/byTeam/:teamid'  , players.getByTeam);
  router.get('/api/players/:id'           , players.getById);

  router.put('/api/players/:id'           , players.update); // mus
  // - Delete
  router.delete('/api/players/:id'        , requireRole('admin'), players.delete); // must be an 'admin' to delete

}
