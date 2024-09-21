import axios from "axios";
import { API_ROOT } from "./constants";

const axiosInstance = axios.create({
  baseURL: API_ROOT, // Thiết lập URL gốc cho mọi request
  withCredentials: true,
});

export default axiosInstance;
