import api from "./base";

export const getRecurringSchedulesByStudioId = async ({studioId}) => {
  try {
    const response = await api.get(`/recurring-schedules/search?studioId=${studioId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};