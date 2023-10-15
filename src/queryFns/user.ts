import { Movie, Series } from "@/types";
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

export const saveMedia = async (itemToSave: Movie | Series) => {
  await axios.post(`${API_URL}/api/playlist/`, itemToSave);
};

export const isInPlaylist = async (id: number) => {
  const response = await axios.post(
    `${API_URL}/api/playlist/isInPlaylist/`,
    id,
  );

  return response.data.status;
};

export const removeInPlaylist = async (id: number) => {
  const response = await axios.delete(
    `${API_URL}/api/playlist/removeInPlaylist/?id=${id}`,
  );

  return response.data.status;
};
