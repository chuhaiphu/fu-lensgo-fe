import api from "./base";

export const creatReviewApi = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

export const getReviewsByStudioIdApi = async (studioId) => {
  try {
    const response = await api.get(`/reviews/search?studioId=${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

