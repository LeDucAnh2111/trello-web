import axios from "axios";
import { API_ROOT } from "@/util/constants";

const createCardlAPIs = async (data) => {
  const card = await axios.post(`${API_ROOT}/v1/cards`, data);
  return card.data;
};

const updateCardlAPIs = async (id, data) => {
  const card = await axios.put(`${API_ROOT}/v1/cards/${id}`, data);
  return card.data;
};

const deleteCardAPIs = async (id) => {
  const card = await axios.delete(`${API_ROOT}/v1/cards/${id}`);
  return card.data;
};

export const CardAPIs = {
  createCardlAPIs,
  updateCardlAPIs,
  deleteCardAPIs,
};
