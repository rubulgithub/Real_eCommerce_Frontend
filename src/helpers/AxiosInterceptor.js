// console.log("top side interceptor");
// import store from "../store/Store.js";
// import { toast } from "react-toastify";
// import { userRefreshToken, userLogout } from "../store/Slices/AuthSlice.js";
// // import { privateInstance } from "./Api.js";

// console.log("inside interceptor");

// // Attach access token to every request
// privateInstance.interceptors.request.use(
//   (config) => {
//     const { accessToken } = store.getState().auth;
//     console.log("Access Token:", accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// privateInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log("Interceptor Error:", error);

//     const originalRequest = error.config;

//     // Handle 401 errors (unauthorized)
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true; // Prevent infinite loops

//       try {
//         // Attempt to refresh the token
//         const response = await store.dispatch(userRefreshToken());
//         console.log("Token Refresh Response:", response);

//         const { accessToken } = response.payload || {};
//         if (accessToken) {
//           console.log("New Access Token:", accessToken);

//           // Attach the new token to the original request
//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return privateInstance(originalRequest); // Retry the original request
//         } else {
//           throw new Error("Failed to refresh token: No access token received.");
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);

//         // Log out the user and redirect to login
//         store.dispatch(userLogout());
//         toast.error("Session expired. Redirecting to login...");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // Reject all other errors
//   }
// );

// // export { privateInstance };
