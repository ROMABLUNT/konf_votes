import axios from 'axios';

const API_BASE = 'https://api.timetocode.ru/api';

// Получить список событий
export const getEvents = async () => {
  const response = await axios.get(`${API_BASE}/vote-events`);
  return response.data;
};

// Получить список участников для конкретного события
export const getMembers = async (eventId) => {
  const response = await axios.get(`${API_BASE}/members/${eventId}`);
  return response.data;
};

// Отправить голос за участника
export const voteForMember = async (voteData) => {
  try {
    const response = await axios.post(`${API_BASE}/vote-for-member`, voteData);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при отправке голосов:', error);
    throw error;
  }
};