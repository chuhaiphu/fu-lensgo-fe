import api from "./base";

export const loginApi = async (payload) => {
  try {
    const response = await api.post("/account/login", payload);
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", JSON.stringify(access_token));
    localStorage.setItem("refresh_token", JSON.stringify(refresh_token));

    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const registerApi = async (signupData) => {
  try {
    const response = await api.post("/account/register", signupData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await api.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const getAccountsApi = async () => {
  try {
    const response = await api.get("/accounts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAccountByEmail = async (email) => {
  try {
    const response = await api.get(`/accounts/${email}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await api.get(`/accounts/id?id=${accountId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};
