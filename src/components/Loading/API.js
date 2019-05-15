import axios from "axios";
import constants from "../../constants";

export const normalAPI = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
export const formDataAPI = axios.create({
  baseURL: constants.BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
