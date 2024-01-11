import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: "http://192.168.0.106:3000",
});

export { api };