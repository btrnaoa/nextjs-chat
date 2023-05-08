import { Message } from '@/types/chat';
import axios from 'axios';

export const getMessages = async () => {
  const res = await axios.get<Message[]>('http://localhost:3001/messages');
  return res.data;
};
