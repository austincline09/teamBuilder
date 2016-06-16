/****

combine all product actions into one export file

****/


import * as listActions from './teamListActions';
import * as singleActions from './teamSingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
