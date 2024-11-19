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

export const createCombo = async (comboData) => {
  try {
    const response = await api.post('/combos', comboData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};