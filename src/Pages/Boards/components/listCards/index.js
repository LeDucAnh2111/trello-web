import Card from "../Card"; //
import classNames from "classnames/bind";
import styles from "./ListCards.module.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo } from "react";

const cx = classNames.bind(styles);

function ListCard({ cards }) {
  return (
    <>
      <SortableContext
        items={cards.map((card) => card._id)}
        strategy={verticalListSortingStrategy}
      >
        {cards.map((card) => (
          <Card key={card._id} id={card._id} card={card}></Card>
        ))}
      </SortableContext>
    </>
  );
}

export default memo(ListCard);
