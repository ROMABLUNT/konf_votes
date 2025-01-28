import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMembers } from '../../services/api';

// Асинхронный action для получения участников конференции
export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (conferenceId) => {
    return await getMembers(conferenceId);
  }
);

// Slice для управления участниками
const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default membersSlice.reducer;
