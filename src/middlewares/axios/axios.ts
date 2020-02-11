import axios from "axios";
import { environment } from "../../environments";

export const instance = axios.create({
  baseURL: environment.apiUrl
});
