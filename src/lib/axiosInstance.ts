import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com/posts";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
