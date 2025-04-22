import api from "./api";
import { jwtDecode } from "jwt-decode";

export const register = async (
  username: string,
  password: string,
  role: "ADMIN" | "USER"
) => {
  const response = await api.post("/auth/register", {
    username,
    password,
    role,
  });
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response;
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined" && typeof token != "undefined") {
    localStorage.setItem("jwt_token", token);
    if (typeof token !== "string") {
      throw new Error("Token is invalid.");
    }
    const decoded: { username: string; role: "USER" | "ADMIN" } =
      jwtDecode(token);
    localStorage.setItem("username", decoded.username);
    localStorage.setItem("role", decoded.role);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt_token");
  }
  return null;
};

export const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};
