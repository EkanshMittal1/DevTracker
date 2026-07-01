import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getIssues = () => API.get("/issues");

export const getIssue = (id) => API.get(`/issues/${id}`);

export const createIssue = (issue) => API.post("/issues", issue);

export const updateIssue = (id, issue) =>
  API.put(`/issues/${id}`, issue);

export const deleteIssue = (id) =>
  API.delete(`/issues/${id}`);