import { useAuthStore } from "@/src/store/useAuthStore"; // Import your Zustand store
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// --- REQUEST INTERCEPTOR ---
// This runs BEFORE every request is sent
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- RESPONSE INTERCEPTOR ---
// This runs AFTER every response (or error)
api.interceptors.response.use(
  (response) => response, // If the request succeeds, just return the response
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. Call the refresh token endpoint
        // Note: Use 'api' itself or a separate axios call.
        // The browser automatically sends the refreshToken cookie.
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // 2. Extract new access token (based on your Express res.formatter structure)
        const newAccessToken = res.data.accessToken;

        // 3. Update Zustand store with the new token
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 4. Update the failed request's header and retry it
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails (e.g., refresh token also expired), log out the user
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    throw error;
  },
);

export default api;
