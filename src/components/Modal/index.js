import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
function Modal({ children, className, ...events }) {
  // let className = cx("wrapper", {
  //   [className]: className,
  //   primary,
  //   outline,
  //   rounded,
  //   disabled,
  // });
  let classNames = cx("modal", {
    [className]: className,
  });
  return (
    <div className={cx("container-modal")}>
      <div className={cx("box-cover")}>
        <div className={cx("cover")} {...events}></div>
        <div className={classNames}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
