// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import membersReducer from './slices/membersSlice';
import votingReducer from './slices/votingSlice'; // Импортируем новый слайс
import resultsReducer from './slices/resultsSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    members: membersReducer,
    voting: votingReducer,
    results: resultsReducer // Добавляем новый слайс в store
  },
});

export default store;
