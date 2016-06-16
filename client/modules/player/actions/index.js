/****

combine all product actions into one export file

****/


import * as listActions from './playerListActions';
import * as singleActions from './playerSingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
