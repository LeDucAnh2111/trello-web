/* eslint-disable array-callback-return */
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ListMenuSideBar from "./ListMenuSideBar";
import Button from "@/components/Button";
import Menu from "@/components/Popper/Menu";
const cx = classNames.bind(styles);

function SideBar() {
  return (
    <div className={cx("side-bar")}>
      <div className={cx("header-sidebar")}>
        <div className={cx("logo")}>T</div>
        <div className={cx("header-content")}>
          <a href="#"> Trello Không gian làm việc</a>
          <span> Miễn phí </span>
        </div>
        <div className={cx("toggle-show")}>
          <FontAwesomeIcon
            className={cx("icon")}
            icon={faAngleLeft}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className={cx("list-menu-sidebar")}>
        {ListMenuSideBar.map((item, index) => {
          return (
            <div key={index} className={cx("groups")}>
              {item.title && (
                <div className={cx("title-group")}>
                  {item.title}
                  {item.push && <span>Xin chào</span>}
                </div>
              )}
              <div className={cx("box-menu")}>
                {item.items.map((item, index) => {
                  return (
                    <div key={index} className={cx("box-item", "flex")}>
                      <Button leftIcon={item.leftIcon} classNames={cx("title")}>
                        {item.name}
                      </Button>
                      {item.children && (
                        <Menu
                          className={cx("buttondown")}
                          listItem={item.children}
                        >
                          <Button classNames={cx("buttonChildMenu")}>
                            <FontAwesomeIcon
                              icon={faAngleDown}
                              className={cx("down")}
                            ></FontAwesomeIcon>
                          </Button>
                        </Menu>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
