/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ListMenuSideBar from "./ListMenuSideBar";
import Button from "@/components/Button";
import Menu from "@/components/Popper/Menu";
import { memo } from "react";
const cx = classNames.bind(styles);

function SideBar({ toggleSidebar, onClick }) {
  return (
    <div className={cx("side-bar", { "side-bar-toggle": toggleSidebar })}>
      {toggleSidebar && (
        <div className={cx("show-sidebar")} onClick={onClick}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </div>
      )}

      <div className={cx("header-sidebar")}>
        <div className={cx("logo")}>T</div>
        <div className={cx("header-content")}>
          <a href="#"> Trello Không gian làm việc</a>
          <span> Miễn phí </span>
        </div>
        <div className={cx("toggle-show")} onClick={onClick}>
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
                  {item.push && <span>{item.push}</span>}
                </div>
              )}
              <div className={cx("box-menu")}>
                {item.items.map((item, index) => {
                  console.log(item);
                  return (
                    <div key={index} className={cx("box-item", "flex")}>
                      {item.template && (
                        <img
                          className={cx("template-img")}
                          src="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg"
                          alt=""
                        ></img>
                      )}
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

export default memo(SideBar);
