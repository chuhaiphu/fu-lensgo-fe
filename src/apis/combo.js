import api from "./base";
export const getCombosByStudioIdApi = async ({studioId}) => {
  try {
    const response = await api.get(`/combos/search?studioId=${studioId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};