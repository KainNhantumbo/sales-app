import axios from 'axios';

// const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4500';
const API_BASE_URL = 'https://sales-api-8nyd.onrender.com';

export default axios.create({ baseURL: API_BASE_URL });
