import api from "./base";

export const getShootingTypeByStudioId = async (studioId) => {
  try {
    const response = await api.get(`/shootingTypes/${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const createShootingType = async (shootingTypeData) => {
  try {
    const response = await api.post('/shootingTypes', shootingTypeData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};
