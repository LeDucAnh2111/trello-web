// import "@/output.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { faChevronDown, faList } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.modue.scss";
import Button from "@/components/Button";

import MenuDataList from "./MenuDataList";
const cx = classNames.bind(styles);
function Header() {
  return (
    <div
      className={cx(
        "container ",
        "flex justify-between items-center  bg-blue-600 px-4"
      )}
    >
      <div
        className={cx("header-left", "flex items-center justify-between gap-5")}
      >
        <div className="list-group">
          <FontAwesomeIcon
            icon={faList}
            className="text-white text-3xl"
          ></FontAwesomeIcon>
        </div>
        <div className={cx("logo")}>
          <img
            src="https://trello.com/assets/d947df93bc055849898e.gif"
            alt="logo"
          />
        </div>
        <div className={cx("box-menu")}>
          <ul className={cx("menu", " flex justify-around gap-5")}>
            {MenuDataList.map((item, index) => {
              return (
                <li key={index} className={cx("item")}>
                  <Button
                    rightIcon={item.rightIcon}
                    leftIcon={item.leftIcon}
                    classNames={cx("button")}
                  >
                    {" "}
                    {item.title}{" "}
                  </Button>
                </li>
              );
            })}
            <li className={cx("item")}>
              <Button
                rightIcon={
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                }
                classNames={cx("button")}
              >
                {" "}
                Workspaces{" "}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
