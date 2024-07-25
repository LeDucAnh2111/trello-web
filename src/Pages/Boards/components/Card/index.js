import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react";
import { Children, Fragment, useEffect, useRef, useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Card.module.scss";
import Button from "@/components/Button";
import Title from "@/components/Title";

const cx = classnames.bind(styles);

function Card({ children, classname, card, id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id, data: { ...card } });

  const style = {
    transform: CSS.Translate.toString(transform),
    TransitionEvent,
    opacity: isDragging ? 0.5 : undefined,
  };
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const elmCard = useRef(null);
  // Set show hide icon pen in card
  useEffect(() => {
    const show = () => {
      setTimeout(() => {
        setShowUpdateCard(true);
      }, 200);
    };
    const hide = () => {
      setTimeout(() => {
        setShowUpdateCard(false);
      }, 200);
    };
    elmCard.current.addEventListener("mouseenter", show());
    elmCard.current.addEventListener("mouseleave", hide());
  }, []);

  const cardAddOn = () => {
    return card.memberIds.length > 0 || card.comments.length > 0;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cx("card", {
        "w-card": cardAddOn(),
      })}
    >
      <div ref={elmCard} {...listeners}>
        {card.cover && <img src={card?.cover} alt="img"></img>}
        <div className={cx("content-card")}>
          {card.title}
          {showUpdateCard && (
            <div className={cx("edit")}>
              <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </div>
          )}
        </div>
        {cardAddOn() && (
          <div className={cx("add-ons")}>
            {card.memberIds && (
              <Title title="Members">
                <Button
                  className={cx("item", "messages")}
                  leftIcon={<FontAwesomeIcon icon={faEye} />}
                ></Button>
              </Title>
            )}
            {card.comments && (
              <Title title="Comments">
                <Button
                  className={cx("item", "messages")}
                  leftIcon={<FontAwesomeIcon icon={faComment} />}
                >
                  {card?.comments?.lenght}
                </Button>
              </Title>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
