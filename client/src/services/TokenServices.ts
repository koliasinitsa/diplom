// src/services/TokenServices.ts

import Cookies from 'js-cookie';

export function getDecodedToken() {
  const token = Cookies.get('token') || '';
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  return decodedToken;
}