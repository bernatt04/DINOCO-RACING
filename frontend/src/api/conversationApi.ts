import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchConversationsByClient = async (clientId: string) => {
  const response = await axios.get(`${API_URL}/conversations/client/${clientId}`);
  return response.data;
};

export const fetchConversationById = async (id: string) => {
  const response = await axios.get(`${API_URL}/conversations/${id}`);
  return response.data;
};

export const createConversation = async (clientId: string, messages: Array<{ sender: string; text: string }>) => {
  const response = await axios.post(`${API_URL}/conversations`, { clientId, messages });
  return response.data;
};