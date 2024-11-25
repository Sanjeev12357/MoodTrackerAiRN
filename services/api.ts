import axios from 'axios';

const API_URL = 'http://localhost:4000/api/insights';

export const fetchInsights = async (mood: number, description: string) => {
  const response = await axios.post(API_URL, { mood, description });
  return response.data.insight;
};
