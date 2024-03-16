import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.3.27:3000",
  baseURL: "http://social.chmhuster.com.br:3000",
  // baseURL: "https://social-server-bgpu.onrender.com",
  // baseURL: "http://192.168.0.117:3000",
});


api.interceptors.response.use(
  // Função chamada em caso de sucesso
  async (response) => {
    return response;
  },
  // Função chamada em caso de erro
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");
      if (refreshToken) {
        await renewToken(refreshToken); // Chama a função para renovar o token
        // Reexecuta a solicitação original com o novo token
        originalRequest.headers.Authorization = api.defaults.headers.Authorization;
        return api(originalRequest);
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
      api.defaults.headers.authorization = accessToken;
      await AsyncStorage.setItem("TOKEN", accessToken);
      await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
    } else {
      throw new Error("New accessToken not received");
    }
  } catch (error: any) {
    console.error("Error renewing token:", error.response.data.message);
    throw error;
  }
}


export { api };