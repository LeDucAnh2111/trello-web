const { default: axiosInstance } = require("@/util/axiosInstance");

const getInvitation = async () => {
  const results = await axiosInstance.get("/v1/invitations");
  return results.data;
};

const updateInvitation = async (status, boardId) => {
  const results = await axiosInstance.put("/v1/invitations", {
    status,
    boardId,
  });
  return results.data;
};

const createInvitation = async (userIds, boardId) => {
  const results = await axiosInstance.post("/v1/invitations", {
    userIds,
    boardId,
  });
  return results.data;
};

export const invitationApis = {
  getInvitation,
  updateInvitation,
  createInvitation,
};
