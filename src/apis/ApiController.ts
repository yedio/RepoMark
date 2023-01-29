import axios from "axios";
import { API_BASEURL } from "../config";

const defaultOption = {
  baseURL: API_BASEURL,
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer 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`,
  },
};

const instance = axios.create(defaultOption);

instance.interceptors.request.use(
  (config) => {
    // localStorage.setItem("isLoading", "true");
    return config;
  },
  (error) => {
    // localStorage.removeItem("isLoading");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // localStorage.removeItem("isLoading");

    return response.data;
  },
  (error) => {
    // localStorage.removeItem("isLoading");
    return Promise.reject(error);
  }
);

export default instance;
