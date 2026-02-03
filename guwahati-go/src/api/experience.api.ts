import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/experience';

export const fetchDiscoverExperiences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/discover`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const fetchExperienceById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};

export const createExperience = async (experienceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, experienceData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

export const updateExperience = async (id: string, experienceData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, experienceData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

export const fetchExperienceStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const fetchExperiencesByDifficulty = async (level: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter/difficulty/${level}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching experiences by difficulty:', error);
    throw error;
  }
};

export default {
  fetchDiscoverExperiences,
  fetchExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  fetchExperienceStats,
  fetchExperiencesByDifficulty
};
