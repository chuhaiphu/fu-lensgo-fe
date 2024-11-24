import api from "./base";

export const getRecurringSchedulesByStudioId = async ({studioId}) => {
  try {
    const response = await api.get(`/recurring-schedules/search?studioId=${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const createRecurringSchedule = async (recurringScheduleData) => {
  try {
    const response = await api.post('/recurring-schedules', recurringScheduleData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};