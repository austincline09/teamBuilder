

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import Layout from './components/TeamLayout.js.jsx';
import List from './components/TeamList.js.jsx';
import Single from './components/SingleTeam.js.jsx';
import Create from './components/CreateTeam.js.jsx';
import Update from './components/UpdateTeam.js.jsx';
import My from './components/MyTeam.js.jsx';

const teamRoutes =
<Route path="/teams" component={Layout} >
  <IndexRoute component={List} />
  <Route path="/teams/new" component={Create} />
  <Route path="/teams/:teamId">
    <IndexRoute component={Single} />
    <Route path="/teams/byCoach/:userid" component={My} />
    <Route path="/teams/:teamId/update" component={Update} />
  </Route>
</Route>





;

export default teamRoutes;
