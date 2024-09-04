import Button from "@/components/Button";
import Input from "@/components/Input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import styles from "./FormUpdateNewColumns.scss";
import { useState } from "react";
import { ColumnAPIs } from "@/Service/columnApi";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function FormUpdateNewColumns({ id, title, toggle }) {
  const [valueUpdateNameColumn, setValueUpdateNameColumn] = useState(title);

  const checkValue = (value) => {
    toast.error(value);
  };

  const handleSetValueUpdateNameColumn = (value) => {
    console.log(value);
    setValueUpdateNameColumn(value);
  };

  const handleSetValueUpdateNameColumnaddEventListener = (event) => {
    if (event.key === "Enter") {
      ColumnAPIs.updateColumnOrderIds(id, { title: valueUpdateNameColumn })
        .then(() => {
          toggle();
          setValueUpdateNameColumn("");
        })
        .catch((error) => {
          checkValue(error.message);
        });
    }
  };

  return (
    <div className={cx("formCreateColumn")}>
      <div className={cx("boxButtonCloseAddColumn")}>
        <Input
          className={cx("inputCreateNewColumn")}
          type="text"
          value={valueUpdateNameColumn}
          onKeyDown={handleSetValueUpdateNameColumnaddEventListener}
          onChange={(e) => {
            handleSetValueUpdateNameColumn(e.target.value);
          }}
          autofocus={true}
          placeholder="Nhập tên danh sách..."
        ></Input>
        <Button onClick={toggle} className={cx("buttonClose")}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
}

export default FormUpdateNewColumns;
