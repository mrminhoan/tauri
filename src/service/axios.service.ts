import { BASE_API_URL } from "@/contanst";
import axios from "axios";
const instance = axios.create({
  baseURL: BASE_API_URL.url_v1,
  timeout: 3000,
});

export default instance;
