import Header from "@/components/layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import BoardBar from "../components/BoardBar";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Menu from "@/components/Popper/Menu";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };
  const handleToggleSidebar = () => {
    console.log("check");
    setToggleSidebar(!toggleSidebar);
  };

  console.log(toggleSidebar);
  return (
    <div className="container mx-auto h-screen">
      {toggleModal && (
        <Modal onClick={handleToggleModal} className={cx("box-modal")}>
          <div className={cx("modal-add-user")}>
            <h3 className={cx("title")}>Chia sẻ bảng</h3>
            <div className={cx("box-add")}>
              <Input
                className={cx("search-user")}
                placeholder="Địa chỉ email hoặc tên "
              />
              <Menu listItem={[1, 2, 3]}>
                <div className={cx("box-list-user")}>
                  <Button
                    classNames={cx("list-user")}
                    rightIcon={
                      <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                    }
                  >
                    Thành viên
                  </Button>
                </div>
              </Menu>
              <Button classNames={cx("button-share")}>Chia sẻ</Button>
            </div>
          </div>
        </Modal>
      )}

      <Header />
      <div className={cx("body")}>
        <div
          className={cx("box-sidebar", { "box-sidebar-close": toggleSidebar })}
        >
          <SideBar
            toggleSidebar={toggleSidebar}
            onClick={handleToggleSidebar}
          ></SideBar>
        </div>

        <div className={cx("box-content")}>
          <BoardBar onClick={handleToggleModal} />
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
