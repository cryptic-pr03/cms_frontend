/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';

const setJwtToken = (token) => localStorage.setItem('jwtToken', token);
const deleteJwtToken = () => localStorage.removeItem('jwtToken');
const getJwtToken = () => localStorage.getItem('jwtToken');

const getCurrentUser = () => {
  const token = getJwtToken();
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

export {
  setJwtToken,
  deleteJwtToken,
  getJwtToken,
  getCurrentUser,
};
