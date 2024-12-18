import axios from 'axios';

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL, withCredentials: true });
export const nextApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_NEXT_SERVER_URL });
