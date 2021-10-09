import axios from 'axios';

export interface ErrorResponse {
  message: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
