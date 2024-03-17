import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.0.106:3000",
  baseURL: "http://social.chmhuster.com.br:3000",
  // baseURL: "https://social-server-bgpu.onrender.com",
  // baseURL: "http://192.168.0.117:3000",
});

api.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");
      if (refreshToken) {
        try {
          const response = await renewToken(refreshToken);
          originalRequest.headers.Authorization = `${response.accessToken}`;
          return api(originalRequest);
        } catch (error: any) {
          console.error("Error renewing token:", error.response.data.message);
          throw error;
        }
      }
    }
    return Promise.reject(error);
  }
);

async function renewToken(oldRefreshToken: string) {
  try {
    const response = await api.post("/auth/refresh-token", null, {
      headers: { refresh_token: oldRefreshToken },
    });
    const { accessToken, refreshToken } = response?.data;
    if (accessToken) {
      api.defaults.headers.authorization = `${accessToken}`;
      
      await AsyncStorage.setItem("TOKEN", accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
      return { accessToken, refreshToken };
    } else {
      throw new Error("New accessToken not received");
    }
  } catch (error: any) {
    console.error("Error renewing token:", error.response.data.message);
    throw error;
  }
}

export { api };
