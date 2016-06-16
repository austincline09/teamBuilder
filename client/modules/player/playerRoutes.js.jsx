


import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import Layout from './components/PlayerLayout.js.jsx';
import List from './components/PlayerList.js.jsx';
import Single from './components/SinglePlayer.js.jsx';
import Create from './components/CreatePlayer.js.jsx';
import Update from './components/UpdatePlayer.js.jsx';

const playerRoutes =
<Route path="/players" component={Layout} >
  <IndexRoute component={List} />
  <Route path="/players/new" component={Create} />
  <Route path="/players/:playerId">
    <IndexRoute component={Single} />
  <Route path="/players/:playerId/update" component={Update} />
  </Route>
</Route>

;

export default playerRoutes;
