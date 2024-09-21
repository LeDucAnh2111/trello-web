/* eslint-disable no-undef */
import classNames from "classnames/bind";
import styles from "./Columns.module.scss";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faGripLines,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Menu from "@/components/Popper/Menu";
import ListCards from "../listCards";
import OpenCreateNewCardsForm from "./component/OpenCreateNewCardsForm";
import FormUpdateNewColumns from "./component/FormUpdateColumn";
import Modal from "@/components/Modal";
import { ColumnAPIs } from "@/Service/columnApi";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
// const HEIGHT_COLUMNS=
function Columns({ children, column }) {
  const [toggleFromCreateNewCards, setToggleFromCreateNewCards] =
    useState(false);
  const [toggleFromUpdateNameColumns, setToggleFromUpdateNameColumns] =
    useState(false);
  const [toggleModalDelete, setToggleModalDelete] = useState(false);
  const handleToggleFromCreateNewCards = () => {
    setToggleFromCreateNewCards(!toggleFromCreateNewCards);
  };

  const handleToggleFromUpdateNameColumns = () => {
    setToggleFromUpdateNameColumns(!toggleFromUpdateNameColumns);
  };

  const handleToggleModalDelete = () => {
    setToggleModalDelete(!toggleModalDelete);
  };

  const submitDeleteColumns = () => {
    ColumnAPIs.deleteColumnAPIs(column._id).then((response) => {
      toast.success(response.message);
      handleToggleModalDelete();
    });
  };

  // useSortable mình chuyền id và data vào để khi kéo thả thì nó có thể chuyền dữ liệu id của box đang kéo và giá trị của box đang kéo ra phần event của các sự kiện như onDragEnd, onDragOver , onDragStart ,... để có thể thao tác với các giá trị dễ dàng hơn
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
      event: {
        onClick: () => {
          handleToggleModalDelete();
        },
      },
    },
    {
      title: "Rename",
      event: {
        onClick: () => {
          // window.location.href = "http://localhost:3000/v1/auth/google";
        },
      },
    },
  ]);

  return (
    <>
      {toggleModalDelete ? (
        <Modal>
          <div className={cx("modal-delete")}>
            <h3 className={cx("title")}>Xác nhận xóa</h3>
            <div className={cx("box-delete")}>
              <p>Bạn có chắc muốn xóa bảng này và các thẻ con của nó?</p>
              <div className={cx("box-btn-delete")}>
                <Button
                  className={cx("btn-delete", "btn")}
                  onClick={submitDeleteColumns}
                >
                  Xóa
                </Button>
                <Button
                  className={cx("btn-cancle", "btn")}
                  onClick={handleToggleModalDelete}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
      <div
        className={cx("box-column")}
        ref={setNodeRef}
        style={dndKitColumnStyle}
        {...attributes}
      >
        <div className={cx("columns")}>
          {!toggleFromUpdateNameColumns ? (
            <div className={cx("header-columns")} {...listeners}>
              <Button
                className={cx("title-columns")}
                onClick={handleToggleFromUpdateNameColumns}
              >
                {column.title}
              </Button>
              <Menu listItem={listmenu.current}>
                <Button className={cx("other-columns")}>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={cx("icon")}
                  />
                </Button>
              </Menu>
            </div>
          ) : (
            <div className={cx("header-columns")}>
              <FormUpdateNewColumns
                id={column._id}
                title={column.title}
                toggle={handleToggleFromUpdateNameColumns}
              />
            </div>
          )}
          <div className={cx("content-columns")}>
            <ListCards
              cards={column.cards}
              cardOrderIds={column.cardOrderIds}
            ></ListCards>
          </div>

          {!toggleFromCreateNewCards ? (
            <div className={cx("footer-columns")}>
              <Button
                onClick={handleToggleFromCreateNewCards}
                className={cx("add-card")}
                leftIcon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={cx("add-card-icon")}
                  />
                }
              >
                Thêm thẻ
              </Button>
              <Button className={cx("icon-new-sample")}>
                <FontAwesomeIcon icon={faGripLines} />
              </Button>
            </div>
          ) : (
            <div className={cx("footer-columns")}>
              <OpenCreateNewCardsForm
                toggleForm={handleToggleFromCreateNewCards}
                columnId={column._id}
              />
            </div>
          )}
          {/* Add logic for toggling modal */}
        </div>
      </div>
    </>
  );
}

export default Columns;
