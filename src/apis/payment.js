import api from "./base";

export const createPaymentApi = async (paymentData) => {
  try {
    const response = await api.post('/payments', paymentData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
}

export const getPaymentByIdApi = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
}