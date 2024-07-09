import axios from "axios";

const CustomApiLogin = axios.create({
  baseURL: "http://13.124.194.48:9000",
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true,
});

const CustomApi = axios.create({
  baseURL: "http://13.124.194.48:9000",
  headers: {
    'Content-Type': 'application/json',
  },
});

export { CustomApiLogin, CustomApi };
