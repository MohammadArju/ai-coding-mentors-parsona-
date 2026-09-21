// api.js

import axios from "axios";

export const api = axios.create({
  baseURL: "https://ai-coding-mentors-parsona.onrender.com",
  withCredentials: true,
});