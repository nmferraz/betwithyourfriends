import axios from "axios";

// switch localhost to your ip address
export const api = axios.create({
  baseURL: "http://localhost:3333",
});
