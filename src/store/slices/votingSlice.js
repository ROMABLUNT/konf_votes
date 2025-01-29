// src/store/slices/votingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { voteForMember } from '../../services/api';

// Изменяем на sendVote для отправки одного голоса
export const sendVote = createAsyncThunk(
  'voting/sendVote',
  async (voteData, { rejectWithValue }) => {
    try {
      // Отправляем один голос на сервер
      const response = await voteForMember(voteData);
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