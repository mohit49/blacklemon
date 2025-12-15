import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

export const signup = (email, password) => axios.post(API_ENDPOINTS.SIGNUP, { email, password });

export const login = (email, password) => axios.post(API_ENDPOINTS.LOGIN, { email, password });
