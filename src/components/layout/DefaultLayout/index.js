import Header from "@/components/layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import BoardBar from "../components/BoardBar";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto h-screen">
      <Header />
      <BoardBar />
      <div className="Content">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default DefaultLayout;
