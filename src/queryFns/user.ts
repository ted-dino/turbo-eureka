import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });

  return response;
};

export const register = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const status = await axios.post(`${API_URL}/api/auth/register`, {
    email,
    password,
    confirmPassword,
  });

  return status;
};

export const logout = async () => {
  const status = await axios.post(`${API_URL}/api/auth/logout`);

  return status;
};
