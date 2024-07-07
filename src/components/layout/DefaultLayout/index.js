import Header from "@/components/layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

import SideBar from "../components/SideBar";
import { useCallback, useState } from "react";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    console.log("check");
    setToggleSidebar(!toggleSidebar);
  }, [toggleSidebar]);

  console.log(toggleSidebar);
  return (
    <div className="container mx-auto h-screen">
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

        <div className={cx("box-content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
