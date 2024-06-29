import Header from "@/components/layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import BoardBar from "../components/BoardBar";
import SideBar from "../components/SideBar";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto h-screen">
      <Header />
      <div className="body">
        <SideBar></SideBar>
        <div className="content">
          <BoardBar />
          <h1>Content</h1>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
