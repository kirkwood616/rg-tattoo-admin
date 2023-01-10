import axios, { AxiosRequestConfig } from "axios";
import { auth } from "firebaseConfig";

const apiAdminRoute = process.env.REACT_APP_API_ADMIN_ROUTE || "";

const admin = axios.create({
  baseURL: apiAdminRoute,
});

admin.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    config.headers = { token: "" };
    const userToken = await auth.currentUser?.getIdToken(true);
    if (userToken) config.headers.token = userToken;
    return config;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
});

export default admin;
