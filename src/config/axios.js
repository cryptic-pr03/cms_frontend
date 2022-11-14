import axios from 'axios';

const BASE_URL = 'https://glacial-plateau-56806.herokuapp.com/';
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
