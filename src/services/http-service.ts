import axios from "axios";
import { assetUrl } from "../constants";

export const HTTP = axios.create({
  baseURL: assetUrl,
});
