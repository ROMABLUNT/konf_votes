import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import membersReducer from './slices/membersSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    members: membersReducer,
  },
});

export default store;
