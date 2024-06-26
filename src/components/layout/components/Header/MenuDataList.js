const { faPaste, faCopy } = require("@fortawesome/free-regular-svg-icons");
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
];

export default MenuDataList;
