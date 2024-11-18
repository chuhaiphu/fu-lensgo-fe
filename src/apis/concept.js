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

export const getStudioConceptByStudioConceptId = async (studioConceptId) => {
  try {
    const response = await api.get(`/studio-concepts/${studioConceptId}`);
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

export const createConcept = async (conceptData) => {
  try {
    const response = await api.post('/concepts', conceptData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const createStudioConcept = async (studioConceptData) => {
  try {
    const response = await api.post('/studio-concepts', studioConceptData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};