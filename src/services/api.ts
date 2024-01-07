import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: Platform.OS == "ios" ? "http://192.168.0.106:3000" : "http://192.168.0.106:3000",
  timeout: 5000,
});

const baseUrls = ["http://127.0.0.1:3000", "http://127.0.0.1:8080"];
let currentBaseUrlIndex = 0;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é devido a um timeout ou erro de rede
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      // Alterna para o próximo URL de base
      currentBaseUrlIndex = (currentBaseUrlIndex + 1) % baseUrls.length;
      api.defaults.baseURL = baseUrls[currentBaseUrlIndex];

      // Reenvia a requisição original com o novo URL de base
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { api };