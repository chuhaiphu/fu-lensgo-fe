import api from "./base";

export const getStudiosApi = async () => {
  try {
    const response = await api.get("/studios");
    console.log(response.data);
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
