import Button from "@/components/Button";
import Input from "@/components/Input";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./FormUpdateNewCards.module.scss";
import { useState } from "react";
import { CardAPIs } from "@/Service/cardApi";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function FormUpdateNewCards({ id, title, toggle }) {
  const [valueUpdateNameCard, setValueUpdateNameCard] = useState(title);

  const checkValue = (value) => {
    toast.error(value);
  };

  const handleSetValueUpdateNameCard = (value) => {
    console.log(value);
    setValueUpdateNameCard(value);
  };

  const handleSetValueUpdateNameCardAddEventListener = (event) => {
    if (event.key === "Enter") {
      CardAPIs.updateCardlAPIs(id, { title: valueUpdateNameCard })
        .then(() => {
          toggle();
          setValueUpdateNameCard("");
        })
        .catch((error) => {
          checkValue(error.message);
        });
    }
  };

  return (
    <div className={cx("formCreateCard")}>
      <div className={cx("boxButtonCloseAddCard")}>
        <Input
          className={cx("inputCreateNewCard")}
          type="text"
          value={valueUpdateNameCard}
          onKeyDown={handleSetValueUpdateNameCardAddEventListener}
          onChange={(e) => {
            handleSetValueUpdateNameCard(e.target.value);
          }}
          autofocus={true}
          placeholder="Nhập tên thẻ ..."
        ></Input>
        <Button onClick={toggle} className={cx("buttonClose")}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  );
}

export default FormUpdateNewCards;
