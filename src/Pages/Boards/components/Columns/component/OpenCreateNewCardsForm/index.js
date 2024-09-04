import Button from "@/components/Button";
import Input from "@/components/Input";
import classNames from "classnames/bind";
import styles from "./OpenCreateNewCardsForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardAPIs } from "@/Service/cardApi";
import socket from "@/Service/socket";

const cx = classNames.bind(styles);
function OpenCreateNewCardsForm({ toggleForm, columnId }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const checkValue = (value) => {
    toast.error(value);
  };
  // Kiem tra va gui du lieu len server
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      checkValue("title cannot be empty");
      return;
    }

    CardAPIs.createCardlAPIs({ boardId: id, columnId, title })
      .then((product) => {
        toggleForm();
      })
      .catch((error) => {
        checkValue(error.message);
      });
  };

  return (
    <div className={cx("formCreateCard")}>
      <Input
        value={title}
        onChange={handleTitleChange}
        className={cx("inputCreateNewCard")}
        type="text"
        autofocus={true}
        placeholder="Nhập tên danh sách..."
      ></Input>
      <div className={cx("boxButtonCloseAddCard")}>
        <Button onClick={handleSubmit} className={cx("buttonCreateNewCard")}>
          Thêm thẻ
        </Button>
        <Button onClick={toggleForm} className={cx("buttonClose")}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
}

export default OpenCreateNewCardsForm;
