import axios from "axios";

const CustomApi = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default CustomApi;
