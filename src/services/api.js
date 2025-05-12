import axios from 'axios';

const API_BASE = 'https://api.timetocode.ru/api';

export const getEvents = async () => {
  const response = await axios.get(`${API_BASE}/vote-events`);
  return response.data;
};

export const getMembers = async (eventId) => {
  const response = await axios.get(`${API_BASE}/members/${eventId}`);
  return response.data;
};

export const voteForMember = async (voteData) => {
  try {
    const response = await axios.post(`${API_BASE}/vote-for-member`, voteData);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при отправке голосов:', error);
    throw error;
  }
};

export const getReactionCounts = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE}/reaction-counts?member_id=${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении результатов голосования:', error);
    throw error;
  }
};
