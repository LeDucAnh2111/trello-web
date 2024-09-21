import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

const { faTableList } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

export const listSidebar = [
  {
    state: "boards",
    content: "Boards",
    icon: <FontAwesomeIcon icon={faTableList} />,
  },
  {
    state: "creates",
    content: "Create a new board",
    icon: <FontAwesomeIcon icon={faSquarePlus} />,
  },
];
