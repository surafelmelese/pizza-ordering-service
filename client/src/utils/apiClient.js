import axios from 'axios';

//https://pizza-ordering-service-1.onrender.com

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/' ,// Base API
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(process.env.REACT_APP_API_BASE_URL)
apiClient.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`; // Include token in the headers
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;