import axios from 'axios';
import { api_uri } from '../constants/cookie.json';

export const getCookie = async (site, proxy = '') => {
  const response = await axios.get(
    `${api_uri}/getCookie?site=${site}&proxy=${proxy}`
  );
  return response.data.result;
};
