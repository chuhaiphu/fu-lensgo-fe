import api from "./base";

export const createBookingApi = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
}


export const getBookingByIdApi = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

export const getBookingsApi = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
}

export const getBookingsByAccountIdApi = async (accountId) => {
  try {
    const response = await api.get(`/bookings/search?accountId=${accountId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getBookingsByStudioId = async (studioId) => {
  try {
    const response = await api.get(`/bookings/search?studioId=${studioId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

