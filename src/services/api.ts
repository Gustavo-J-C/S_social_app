import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.107:3000",
  // baseURL: "http://social.chmhuster.com.br:3000",
  // baseURL: "https://social-server-bgpu.onrender.com",
  // baseURL: "http://192.168.0.117:3000",
});

export { api };