import api from "./base";

export const getStudiosApi = async () => {
  try {
    const response = await api.get("/studios");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getStudioByIdApi = async (studioId) => {
  try {
    const response = await api.get(`/studios/${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const addStudio = async (newStudioData) => {
  try {
    const response = await api.post(`/studios`, newStudioData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};
