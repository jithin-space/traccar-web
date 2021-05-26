import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { sessionReducer as session } from './session';
import { devicesReducer as devices } from './devices';
import { positionsReducer as positions } from './positions';

import { batchedSubscribe } from 'redux-batched-subscribe';
import throttle from 'lodash.throttle';

const throttleNotify = throttle(notify => notify(),10000);

const reducer = combineReducers({
  session,
  devices,
  positions,
});

export { sessionActions } from './session';
export { devicesActions } from './devices';
export { positionsActions } from './positions';

export default configureStore({ reducer, enhancers: [batchedSubscribe(throttleNotify)] });
