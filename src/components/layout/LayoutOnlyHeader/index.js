import Header from "@/components/layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

import SideBar from "../components/SideBar";
import { useCallback, useState } from "react";

const cx = classNames.bind(styles);
function LayoutOnlyHeader({ children, background }) {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setToggleSidebar(!toggleSidebar);
  }, [toggleSidebar]);
  return (
    <div className={cx("container", { "container-background": background })}>
      <Header />
      <div className={cx("body")}>
        <div className={cx("box-content")}>{children}</div>
      </div>
    </div>
  );
}

export default LayoutOnlyHeader;
