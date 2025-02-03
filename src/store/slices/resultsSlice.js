import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReactionCounts } from '../../services/api'; // Импортируем новый API-запрос

export const fetchReactionCounts = createAsyncThunk(
  'results/fetchReactionCounts',
  async (memberId) => {
    const response = await getReactionCounts(memberId); // Используем API-функцию
    return { memberId, data: response.data }; // Возвращаем объект с ID участника и данными голосов
  }
);

const resultsSlice = createSlice({
  name: 'results',
  initialState: { results: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReactionCounts.fulfilled, (state, action) => {
      state.results[action.payload.memberId] = action.payload.data; // Записываем результаты голосования по участнику
    });
  },
});

export default resultsSlice.reducer;
