import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEye,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Card.module.scss";
import Button from "@/components/Button";
import Title from "@/components/Title";
import FormUpdateNewCards from "./component/FormUpdateCard";
import { CardAPIs } from "@/Service/cardApi";
import { toast } from "react-toastify";

const cx = classnames.bind(styles);

function Card({ children, classname, card, id }) {
  const [toggleFormUpdateNameColumn, setToggleFormUpdateNameColumn] =
    useState(false);
  const [toggleBin, setToggleBin] = useState(false);
  const handleSetToggleFormUpdateNameColumn = () => {
    setToggleFormUpdateNameColumn(!toggleFormUpdateNameColumn);
  };
  // useSortable mình chuyền id và data vào để khi kéo thả thì nó có thể chuyền dữ liệu id của box đang kéo và giá trị của box đang kéo ra phần event của các sự kiện như onDragEnd, onDragOver , onDragStart ,... để có thể thao tác với các giá trị dễ dàng hơn
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

  const cardAddOn = () => {
    return toggleBin;
  };

  const handelToggleBin = () => {
    setToggleBin(!toggleBin);
    setShowUpdateCard(!showUpdateCard);
  };

  const handleDeleteCard = () => {
    CardAPIs.deleteCardAPIs(card._id).then((response) => {
      toast.success(response.message);
      handelToggleBin();
    });
  };

  return (
    <div
      ref={elmCard}
      style={style}
      {...attributes}
      className={cx("card", {
        "h-default": !cardAddOn() && !card.FE_placehoder_card,
        "h-formUpdate": toggleFormUpdateNameColumn,
        "w-card": cardAddOn() && !card.FE_placehoder_card,
        "h-card": card.FE_placehoder_card,
      })}
      onClick={handelToggleBin}
    >
      <div className={cx("box-content")} ref={setNodeRef} {...listeners}>
        {!toggleFormUpdateNameColumn ? (
          <>
            {card.cover && <img src={card?.cover} alt="img"></img>}
            <div className={cx("content-card")}>
              {card.title}
              {showUpdateCard && (
                <>
                  <div
                    className={cx("edit")}
                    onClick={handleSetToggleFormUpdateNameColumn}
                  >
                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                  </div>
                </>
              )}
            </div>
            {cardAddOn() && (
              <div className={cx("add-ons")}>
                <div className={cx("delete")} onClick={handleDeleteCard}>
                  <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </div>
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
          </>
        ) : (
          <FormUpdateNewCards
            id={card._id}
            title={card.title}
            toggle={handleSetToggleFormUpdateNameColumn}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
