import axios from 'axios'
import { URL } from '../url';
const api = axios.create({
    baseURL: URL, // Remplacez par l'URL de votre backend
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export default api;