import api from "./base";

export const createBookingApi = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    console.log(response);
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
