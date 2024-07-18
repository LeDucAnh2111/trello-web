import { Fragment, memo, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ListColumns.module.scss";
import Columns from "../Columns/Wrapper";
import Card from "../Card";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const cx = classNames.bind(styles);

function ListColumns({ listColumns }) {
  const boxContent = useRef(null);

  useEffect(() => {
    const box = boxContent.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      if (e.target !== box) return;
      isDown = true;
      startX = e.pageX - box.offsetLeft;
      scrollLeft = box.scrollLeft;
      box.classList.add(cx("active"));
    };

    const handleMouseLeave = () => {
      isDown = false;
      box.classList.remove(cx("active"));
    };

    const handleMouseUp = () => {
      isDown = false;
      box.classList.remove(cx("active"));
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - box.offsetLeft;
      const walk = x - startX; // *2 để di chuyển nhanh hơn
      box.scrollLeft = scrollLeft - walk;
    };

    box.addEventListener("mousedown", handleMouseDown);
    box.addEventListener("mouseleave", handleMouseLeave);
    box.addEventListener("mouseup", handleMouseUp);
    box.addEventListener("mousemove", handleMouseMove);

    return () => {
      box.removeEventListener("mousedown", handleMouseDown);
      box.removeEventListener("mouseleave", handleMouseLeave);
      box.removeEventListener("mouseup", handleMouseUp);
      box.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={cx("content")} ref={boxContent}>
      <SortableContext
        items={listColumns?.map((column) => column._id)}
        strategy={horizontalListSortingStrategy}
      >
        {listColumns.map((column, index) => (
          <Columns column={column} key={index} title={column?.title}>
            {column.cards.map((card, index) => (
              <Card key={index} value={card}></Card>
            ))}
          </Columns>
        ))}
      </SortableContext>

      <div className={cx("add-columns")}>
        <Button
          className={cx("button-add-columns")}
          leftIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Thêm danh sách khác
        </Button>
      </div>
    </div>
  );
}

export default memo(ListColumns);
