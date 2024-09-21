import axios from "axios";
import axiosInstance from "@/util/axiosInstance";
import { API_ROOT } from "@/util/constants";

axios.defaults.withCredentials = true;

const fetchBoardDetailAPIs = async (id) => {
  const board = await axiosInstance.get(`/v1/boards/${id}`);

  return board.data;
};

const updateBoardDetailAPIs = async (id, columnOrderIds) => {
  const board = await axios.put(`${API_ROOT}/v1/boards/${id}`, columnOrderIds);

  // socket.emit("joinBoard", board.data._id.toString());
  return board.data;
};

const getByOfUser = async (role, query) => {
  let board;

  if (role) {
    board = await axiosInstance.post(`/v1/users-boards/?page=${query}`, {
      role,
    });
    return board.data;
  }
  board = await axiosInstance.post(`/v1/users-boards/`);

  // socket.emit("joinBoard", board.data._id.toString());
  return board.data;
};

const getBoardsByValue = async (value) => {
  const boards = await axiosInstance.post("/v1/users-boards/search", { value });
  return boards.data;
};

const createBoard = async (board) => {
  const newBoard = await axiosInstance.post(`/v1/boards`, board);

  return newBoard.data;
};

const getUserByBoardId = async (boardId) => {
  const boards = await axiosInstance.get(`/v1/users-boards/${boardId}`);
  return boards.data;
};

export const BoardsAPIs = {
  fetchBoardDetailAPIs,
  updateBoardDetailAPIs,
  getByOfUser,
  getBoardsByValue,
  createBoard,
  getUserByBoardId,
};
