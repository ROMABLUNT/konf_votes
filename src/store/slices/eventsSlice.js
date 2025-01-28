import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents } from '../../services/api';

// Асинхронное действие для получения списка событий
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  return await getEvents();
});

// Slice для управления событиями
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
