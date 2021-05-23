import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'positions',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach(item => state.items[item['deviceId']] = item);
    },
    refresh(state, action) {
      state.items = {}
      action.payload.forEach(item => state.items[item['deviceId']] = item); //refresh data from position api
      
    }
  }
});

export { actions as positionsActions };
export { reducer as positionsReducer };
