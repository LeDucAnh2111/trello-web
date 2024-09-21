import classNames from "classnames/bind";
import styles from "./Empty.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Empty = () => {
  return (
    <div className={cx("body")}>
      <div className={cx("stars")}></div>
      <div className={cx("container")}>
        <h1 className={cx("h1")}>404</h1>
        <p>LOST IN SPACE</p>
        <p>`Hmm, looks like that page doesn't exist.`</p>
        <div className={cx("planet")}></div>
        <p>
          <Link className={cx("out")} to="/">
            Go Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Empty;
