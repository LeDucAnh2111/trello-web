/* eslint-disable no-undef */
import classNames from "classnames/bind";
import styles from "./Columns.module.scss";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCopy,
  faGripLines,
  faPaste,
  faPlus,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Menu from "@/components/Popper/Menu";
import Modal from "@/components/Modal";
import ListCards from "../listCards";
import { useDraggable } from "@dnd-kit/core";

const cx = classNames.bind(styles);
// const HEIGHT_COLUMNS=
function Columns({ children, column }) {
  const [nameColumns, setNameColumns] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const handleToggleColumns = () => {
    setNameColumns(!nameColumns);
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: column._id,
      data: { ...column },
    });

  const dndKitColumnStyle = {
    // cái này có thể fix được "tương đối" khi kéo thả trên điện thoại hoặc máy tính
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    TransitionEvent,
    opacity: isDragging ? 0.5 : undefined,
  };
  let listmenu = useRef([
    {
      title: "Delete",
      onClick: () => {
        alert("Xin chào");
      },
    },
    {
      title: "Rename",
      onClick: () => {
        alert("Xin chào");
      },
    },
  ]);
  return (
    <div
      className={cx("box-column")}
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
    >
      <div className={cx("columns")}>
        <div className={cx("header-columns")} {...listeners}>
          <Button className={cx("title-columns")} onClick={handleToggleColumns}>
            {column.title}
          </Button>
          <Menu listItem={listmenu.current}>
            <Button className={cx("other-columns")}>
              <FontAwesomeIcon icon={faChevronDown} className={cx("icon")} />
            </Button>
          </Menu>
        </div>

        <div className={cx("content-columns")}>
          <ListCards cards={column.cards}></ListCards>
        </div>

        <div className={cx("footer-columns")}>
          <Button
            className={cx("add-card")}
            leftIcon={
              <FontAwesomeIcon icon={faPlus} className={cx("add-card-icon")} />
            }
          >
            Thêm thẻ
          </Button>
          {/* Add logic for toggling modal */}
          <Button className={cx("icon-new-sample")}>
            <FontAwesomeIcon icon={faGripLines} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Columns;
