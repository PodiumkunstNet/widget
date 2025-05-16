import axios from 'axios';

export const API_BASE_URL =
  'https://api.podiumkunst.triply.cc/queries/Podiumkunstnet';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosClient;
