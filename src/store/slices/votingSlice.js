// src/store/slices/votingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { voteForMember } from '../../services/api';

export const sendVotes = createAsyncThunk(
  'voting/sendVotes',
  async (votes, { rejectWithValue }) => {
    try {
      // Отправляем массив голосов на сервер
      const response = await voteForMember({ votes });
      return response; // Возвращаем ответ от сервера
    } catch (error) {
      return rejectWithValue(error.response.data); // Обработка ошибок
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
      .addCase(sendVotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendVotes.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendVotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default votingSlice.reducer;
