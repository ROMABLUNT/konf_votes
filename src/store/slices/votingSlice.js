import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { voteForMember } from '../../services/api';


export const sendVote = createAsyncThunk(
  'voting/sendVote',
  async (voteData, { rejectWithValue }) => {
    try {
      const response = await voteForMember(voteData);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const votingSlice = createSlice({
  name: 'voting',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendVote.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendVote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
// 

export default votingSlice.reducer;