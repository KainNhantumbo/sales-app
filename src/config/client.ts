import axios from 'axios';

// const BASE_URL = 'http://localhost:5200/api';
const BASE_URL = 'https://awful-crab-beanie.cyclic.app/api';
export default axios.create({ baseURL: BASE_URL });
