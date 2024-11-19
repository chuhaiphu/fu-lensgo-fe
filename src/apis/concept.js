import api from "./base";

export const getStudioConceptsByStudioId = async ({studioId}) => {
  try {
    const response = await api.get(`/studio-concepts/search?studioId=${studioId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getConceptByConceptId = async (conceptId) => {
  try {
    const response = await api.get(`/concepts/${conceptId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAllConcepts = async () => {
  try {
    const response = await api.get(`/concepts`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

export const addNewStudioConcept = async (newStudioConceptData) => {
  try {
    const response = await api.post(`/studio-concepts`, newStudioConceptData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}