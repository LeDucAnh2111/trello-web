const {
  faPaste,
  faCopy,
  faSquarePlus,
} = require("@fortawesome/free-regular-svg-icons");
const {
  faScissors,
  faChevronDown,
} = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const MenuDataList = [
  {
    title: "Wordspaces",
    rightIcon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
    listitemChild: [
      {
        title: "Cut",
        leftIcon: <FontAwesomeIcon icon={faScissors}></FontAwesomeIcon>,
      },
      {
        title: "Copy",
        leftIcon: <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>,
      },
      {
        title: "Paste",
        leftIcon: <FontAwesomeIcon icon={faPaste}></FontAwesomeIcon>,
      },
    ],
  },
  {
    title: "Recent",
    rightIcon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
    listitemChild: [
      {
        title: "Single",
      },
      {
        title: "1.15",
      },
      {
        title: "Custom : 1.2",
      },

      {
        title: "Add space before paragraph",
        separating: true,
      },
      {
        title: "Add space affter paragraph",
      },
      {
        title: "Custom spacing",
        separating: true,
      },
    ],
  },
  {
    title: "Stated",
    rightIcon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
    listitemChild: [
      {
        title: "Single",
      },
      {
        title: "1.15",
      },
      {
        title: "Custom : 1.2",
      },

      {
        title: "Add space before paragraph",
        separating: true,
      },
      {
        title: "Add space affter paragraph",
      },
      {
        title: "Custom spacing",
        separating: true,
      },
    ],
  },
  {
    title: "Template",
    rightIcon: <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>,
    listitemChild: [
      {
        title: "Cut",
        leftIcon: <FontAwesomeIcon icon={faScissors}></FontAwesomeIcon>,
      },
      {
        title: "Copy",
        leftIcon: <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>,
      },
      {
        title: "Paste",
        leftIcon: <FontAwesomeIcon icon={faPaste}></FontAwesomeIcon>,
      },
    ],
  },
  {
    title: "Create ",
    leftIcon: <FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon>,
  },
];

export default MenuDataList;
