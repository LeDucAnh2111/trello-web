import classnames from "classnames/bind";
import styles from "./Card.module.scss";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye } from "@fortawesome/free-regular-svg-icons";
import Title from "@/components/Title";
import Tippy from "@tippyjs/react";
import { Children, useEffect, useRef, useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function Card({ children, classname, value, ...event }) {
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const elmCard = useRef(null);
  useEffect(() => {
    elmCard.current.addEventListener("mouseenter", () => {
      setTimeout(() => {
        setShowUpdateCard(true);
      }, 200);
    });
    elmCard.current.addEventListener("mouseleave", () => {
      setTimeout(() => {
        setShowUpdateCard(false);
      }, 200);
    });
  }, []);

  const checkBoxAddOns = () => {
    if (value.memberIds.length > 0 || value.comments.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={cx("card", {
        "w-card": checkBoxAddOns(),
      })}
      ref={elmCard}
    >
      {value.cover && <img src={value?.cover} alt="img"></img>}
      <div className={cx("content-card")}>
        {value.title}
        {showUpdateCard && (
          <div className={cx("edit")}>
            <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
          </div>
        )}
      </div>
      {checkBoxAddOns() && (
        <div className={cx("add-ons")}>
          {value.memberIds && (
            <Title title="Members">
              <Button
                className={cx("item", "messages")}
                leftIcon={<FontAwesomeIcon icon={faEye} />}
              ></Button>
            </Title>
          )}
          {value.comments && (
            <Title title="Comments">
              <Button
                className={cx("item", "messages")}
                leftIcon={<FontAwesomeIcon icon={faComment} />}
              >
                {value?.comments?.lenght}
              </Button>
            </Title>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
