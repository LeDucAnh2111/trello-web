import axios from "axios";
import { API_ROOT } from "@/util/constants";

const createColumnlAPIs = async (data) => {
  const column = await axios.post(`${API_ROOT}/v1/columns`, data);
  return column.data;
};

const updateColumnOrderIds = async (id, data) => {
  const column = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
  return column.data;
};

const supportMoveCardsBetweenColumns = async (data) => {
  const column = await axios.put(
    `${API_ROOT}/v1/columns/supports/moving_card`,
    data
  );
  return column.data;
};

const deleteColumnAPIs = async (id) => {
  const column = await axios.delete(`${API_ROOT}/v1/columns/${id}`);
  return column.data;
};

export const ColumnAPIs = {
  createColumnlAPIs,
  updateColumnOrderIds,
  supportMoveCardsBetweenColumns,
  deleteColumnAPIs,
};
