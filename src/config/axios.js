import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const myPrivateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  },
});

export default myAxios;
