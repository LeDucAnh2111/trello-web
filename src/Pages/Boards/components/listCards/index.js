import Card from "../Card"; //
import classNames from "classnames/bind";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useEffect, useState } from "react";
import styles from "./ListCards.module.scss";
import sort from "@/util/sort";

const cx = classNames.bind(styles);

function ListCard({ cards }) {
  console.log(cards);

  return (
    <>
      <SortableContext
        items={cards?.map((card) => card._id)}
        strategy={verticalListSortingStrategy}
      >
        {cards?.map((card) => (
          <Card key={card._id} id={card._id} card={card}></Card>
        ))}
      </SortableContext>
    </>
  );
}

export default memo(ListCard);
