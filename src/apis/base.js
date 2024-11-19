import axios from "axios"

const api = axios.create({
  baseURL: "https://sharemebackend.online",
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check for both 401 and "Token has expired" message
//     if ((error.response?.status === 401 || error.response?.data === "Token has expired") && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
//         // Update to match the working curl request format
//         const response = await axios.post(
//           "https://sharemebackend.online/account/refresh-token",
//           {}, // empty body as shown in curl
//           {
//             headers: {
//               'accept': '*/*',
//               'Authorization': `Bearer ${refreshToken}`
//             }
//           }
//         );

//         const { access_token } = response.data;
//         localStorage.setItem("access_token", JSON.stringify(access_token));

//         // Update the original request with new token
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Clear tokens and redirect on refresh failure
//         localStorage.clear();
//         window.location.href = "/";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't redirect on login endpoint failures
    if (error.config.url.includes('/login')) {
      return Promise.reject(error);
    }

    // Only redirect for other 401 errors
    if (error.response?.status === 401 || error.response?.data === "Token has expired") {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;