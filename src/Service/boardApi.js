import axios from "axios";

import { API_ROOT } from "@/util/constants";
import socket from "./socket";

const fetchBoardDetailAPIs = async (id) => {
  const board = await axios.get(`${API_ROOT}/v1/boards/${id}`);

  return board.data;
};

const updateBoardDetailAPIs = async (id, columnOrderIds) => {
  const board = await axios.put(`${API_ROOT}/v1/boards/${id}`, columnOrderIds);

  // socket.emit("joinBoard", board.data._id.toString());
  return board.data;
};

export const BoardsAPIs = {
  fetchBoardDetailAPIs,
  updateBoardDetailAPIs,
};
