import axios from 'axios';

export interface ErrorResponse {
  message: string;
}

export default function Api() {
  return axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
