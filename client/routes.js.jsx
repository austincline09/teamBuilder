import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import custom components
import Root from './global/components/Root.js.jsx';
import Landing from './modules/static/components/landing/Landing.js.jsx';

//import Post

const routes =
      <Route path="/" component={Root} >
        <IndexRoute component={Landing} />
        {userRoutes}
        {postRoutes}
        {productRoutes}
        {playerRoutes}
        {teamRoutes}
      </Route>
;

export default routes;

import userRoutes from './modules/user/userRoutes.js.jsx';
import postRoutes from './modules/post/postRoutes.js.jsx';
import productRoutes from './modules/product/productRoutes.js.jsx';
import playerRoutes from './modules/player/playerRoutes.js.jsx';
import teamRoutes from './modules/team/teamRoutes.js.jsx'; 
