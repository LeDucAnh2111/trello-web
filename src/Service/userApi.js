import axios from "axios";

import { API_ROOT } from "@/util/constants";
import axiosInstance from "@/util/axiosInstance";

const login = async (user) => {
  const board = await axiosInstance.post(`/v1/users/login`, user);
  return board.data;
};

const logout = async () => {
  const board = await axiosInstance.post(`/v1/users/logout`);
  return board.data;
};

const register = async (user) => {
  const board = await axiosInstance.post(`/v1/users/register`, user);
  console.log("chẹc");

  return board.data;
};

const search = async (name, boardId) => {
  console.log(name, boardId);

  const respone = await axiosInstance.post("/v1/users/search", {
    name,
    boardId,
  });
  return respone.data;
};

const getById = async (req, res, next) => {
  const respone = await axiosInstance.get("/v1/users/");
  return respone.data;
};

export const UserAPIs = { login, register, logout, search, getById };
