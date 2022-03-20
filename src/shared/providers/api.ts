import axios from 'axios';

export interface ErrorResponse {
  message: string;
}

export default function getApi() {
  return axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
