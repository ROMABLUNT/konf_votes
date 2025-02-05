import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReactionCounts } from '../../services/api'; 

export const fetchReactionCounts = createAsyncThunk(
  'results/fetchReactionCounts',
  async (memberId) => {
    const response = await getReactionCounts(memberId); 
    return { memberId, data: response.data }; 
  }
);

const resultsSlice = createSlice({
  name: 'results',
  initialState: { results: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReactionCounts.fulfilled, (state, action) => {
      state.results[action.payload.memberId] = action.payload.data; 
    });
  },
});

export default resultsSlice.reducer;
