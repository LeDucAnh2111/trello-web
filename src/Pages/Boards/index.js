/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep } from "lodash";
import { sort } from "@/util";
import BoardBar from "@/Pages/Boards/components/BoardBar";
import Input from "@/components/Input";
import Menu from "@/components/Popper/Menu";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import styles from "./Table.module.scss";
import ListColumns from "./components/ListColumns";
import { mockData } from "@/dataFake";
import Columns from "./components/Columns";
import Card from "./components/Card";
const cx = classNames.bind(styles);

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function Boards() {
  // set state để làm phần dragOverlay
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  const [orderedColumns, setOrderedColumns] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const findColumnsByCard = (idCard) => {
    return orderedColumns.find((item) =>
      item?.cards?.map((card) => card._id)?.includes(idCard)
    );
  };
  // Yêu cầu chuột di click và di chuyển 10px thì sự kiện mới được hoạt động
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 500 },
  });
  const sensor = useSensors(pointerSensor, mouseSensor, touchSensor);

  const handleToggleModal = useCallback(() => {
    setToggleModal(!toggleModal);
  }, [toggleModal]);

  useEffect(() => {
    setOrderedColumns(
      sort(mockData.board.columns, mockData.board.columnOrderIds, "_id")
    );
  }, []);

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemData(event?.active?.data?.current);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
  };

  /* Để kéo chúng ta cần lấy id của của column mà card đang được kéo , id của column mà card đang over qua, giá trị của card và id của card đang được kéo và khi kéo qua thì sẽ xóa id và giá trị của card ở column cũ và thêm nó vào trong giá trị của column mới */
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    console.log(event);
    const { active, over } = event;
    const {
      id: activeDraggingCard,
      data: { current: activeDraggingCardData },
    } = active;
    const {
      id: activeOverCard,
      data: { current: activeOverCardData },
    } = over;

    console.log(orderedColumns);
    // Tìm column theo card id

    const columnActiveDragging = findColumnsByCard(activeDraggingCard);
    const columnActiveOver = findColumnsByCard(activeOverCard);

    // Kiểm tra nếu không có 1 trong 2 column active over thì chặn hoạt động phía dưới, hạn chế cras trang web
    if (!columnActiveDragging || !columnActiveOver) return;
    // nếu đã có 2 column thì làm tiếp
    if (columnActiveDragging !== columnActiveOver) {
      // kiếm id card đang được kéo trong column
      const cardsInColumnActive = columnActiveDragging.cards.findIndex(
        (card) => card._id === activeDraggingCard
      );
      console.log(cardsInColumnActive);
      // kiếm id card đang được over trong columns
      const cardsInColumnOver = columnActiveOver.cards.findIndex(
        (card) => card._id === activeOverCard
      );

      console.log("giá trị cột mà card đang được kéo :", columnActiveDragging);
      console.log("giá trị cột mà card đang over :", columnActiveOver);
      console.log("index card đang được kéo: ", cardsInColumnActive);
      console.log("id card đang được kéo: ", activeDraggingCard);
      console.log("index card đang được over: ", cardsInColumnOver);
      console.log("id card đang được over: ", activeOverCard);

      setOrderedColumns((preOrderColumns) => {
        const cloneOrderColumns = cloneDeep(preOrderColumns);
        console.log(cloneOrderColumns);
        //Xóa card được kéo ra khỏi column đang chưa nó
        //+ Tìm column chứa card đang được kéo
        let findColumnByActieCard = cloneOrderColumns.find(
          (column) => column._id === columnActiveDragging._id
        );
        //Kiểm tra column này có tồn tại không ( Kiểm cho chắc :)) )
        if (findColumnByActieCard) {
          //+ Thay đổi các mảng cards cũ bằng mảng cards đã được xóa card đang active
          findColumnByActieCard.cards = findColumnByActieCard.cards.filter(
            (card, index) => index !== cardsInColumnActive
          );
          // Xóa id card đang được kéo trong mảng cardOrderIds của column đang chứa card đang được kéo
          findColumnByActieCard.cardOrderIds =
            findColumnByActieCard.cardOrderIds.filter(
              (idCard) => idCard !== activeDraggingCard
            );
        }

        //+ Tìm column chứa card đang được kéo
        let findColumnByOverCard = cloneOrderColumns.find(
          (column) => column._id === columnActiveOver._id
        );
        //Kiểm tra column này có tồn tại không ( Kiểm cho chắc :)) )
        if (findColumnByOverCard) {
          // Thêm card đang kéo vào column đang được card over
          findColumnByOverCard.cards.push(activeDraggingCardData);
          // Thêm id card đang kéo vào mảng cardOrderIds của column đang được card over
          findColumnByOverCard.cardOrderIds.push(activeDraggingCard._id);
        }

        return [...cloneOrderColumns];
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Kiểm tra hành động kéo thả card và tạm thời không làm gì
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return;
    }

    // nếu vị trí sau khi thả không tồn tại (Null) thì nó sẽ return lun không cần làm những cái phía dưới nữa
    if (!over) return;
    // logic kéo thả columns
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(
        (item) => item._id === active.id
      );
      const newIndex = orderedColumns.findIndex((item) => item._id === over.id);
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      setOrderedColumns(dndOrderedColumns);
    }
    // Khi thả box ra thì tất cả các giá trị về lại null
    setActiveDragItemId(null);
    setActiveDragItemData(null);
    setActiveDragItemType(null);
  };

  return (
    <>
      {toggleModal && (
        <Modal onClick={handleToggleModal} className={cx("box-modal")}>
          <div className={cx("modal-add-user")}>
            <h3 className={cx("title")}>Chia sẻ bảng</h3>
            <div className={cx("box-add")}>
              <div className={cx("box-input")}>
                <span className={cx("chip")}>
                  Lê Đức Anh
                  <Button classNames={cx("delete-chip")}>
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faXmark}
                    ></FontAwesomeIcon>
                  </Button>
                </span>
                <Input
                  className={cx("search-user")}
                  placeholder="Địa chỉ email hoặc tên "
                />
              </div>
              <Menu listItem={[1, 2, 3]}>
                <div className={cx("box-list-user")}>
                  <Button
                    classNames={cx("list-user")}
                    rightIcon={
                      <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                    }
                  >
                    Thành viên
                  </Button>
                </div>
              </Menu>
              <Button classNames={cx("button-share")}>Chia sẻ</Button>
            </div>
            <ul className={cx("user-results-list")}>
              <Button classNames={cx("result-user")}>
                <img
                  className={cx("avatar")}
                  src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
                  alt="avatar"
                />
                Nguyễn Văn A<span> # 1123dereretrtrgfg</span>
              </Button>
            </ul>
          </div>
        </Modal>
      )}
      <BoardBar onClick={handleToggleModal} data={mockData} />

      <DndContext
        sensors={sensor}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ListColumns listColumns={orderedColumns}></ListColumns>
        <DragOverlay>
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData}></Card>
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Columns column={activeDragItemData}></Columns>
            )}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default memo(Boards);
