import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default axios.create({ baseURL: API_BASE_URL });
