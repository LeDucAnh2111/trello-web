import classNames from "classnames/bind";
import style from "./BoardBar.module.scss";
import Button from "@/components/Button";
import Menu from "@/components/Popper/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTableCellsLarge,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const cx = classNames.bind(style);

function BoardBar({ onClick, data }) {
  console.log(data);

  return (
    <div className={cx("boardbar")}>
      <div className={cx("left-boardbar")}>
        <Button className={cx("Title-table")}>{data?.board?.title}</Button>
      </div>
      <div className={cx("right-boardbar")}>
        <Button
          onClick={onClick}
          className={cx("icon-invite")}
          leftIcon={<FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>}
        >
          Invite
        </Button>
      </div>
    </div>
  );
}

export default memo(BoardBar);
