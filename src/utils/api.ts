import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sweet-apple-acres.netlify.app/.netlify/functions/api/',
});

export default api;