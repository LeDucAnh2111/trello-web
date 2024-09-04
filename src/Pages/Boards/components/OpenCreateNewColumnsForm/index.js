import Button from "@/components/Button";
import Input from "@/components/Input";
import classNames from "classnames/bind";
import styles from "./OpenCreateNewColumnsForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ColumnAPIs } from "@/Service/columnApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function OpenCreateNewColumnsForm({ toggleForm }) {
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

    ColumnAPIs.createColumnlAPIs({ title, boardId: id })
      .then((product) => {
        toggleForm();
      })
      .catch((error) => {
        checkValue(error.message);
      });
  };

  return (
    <div className={cx("formCreateColumn")}>
      <Input
        value={title}
        onChange={handleTitleChange}
        className={cx("inputCreateNewColumn")}
        type="text"
        autofocus={true}
        placeholder="Nhập tên danh sách..."
      ></Input>
      <div className={cx("boxButtonCloseAddColumn")}>
        <Button onClick={handleSubmit} className={cx("buttonCreateNewColumn")}>
          Thêm danh sách
        </Button>
        <Button onClick={toggleForm} className={cx("buttonClose")}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
}

export default OpenCreateNewColumnsForm;
