// src/services/apiService.js
import axiosInstance from '../util/ApiInstance';

// Define functions to make API requests
export const listAccounts = async () => {
  try {
    const response = await axiosInstance.get('/list-accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Optionally, handle specific errors
  }
};



export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
