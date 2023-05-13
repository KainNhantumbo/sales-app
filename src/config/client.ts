import axios from 'axios';

export const BASE_URL = 'http://localhost:4500';
// export const BASE_URL = 'https://awful-crab-beanie.cyclic.app/api';
export default axios.create({ baseURL: BASE_URL });
