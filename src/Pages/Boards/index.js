/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  closestCorners,
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
import Columns from "./components/Columns";
import Card from "./components/Card";
import { generatePlaceholderCard } from "@/util/formatter";
import { BoardsAPIs } from "@/Service/boardApi";
import { useParams, Redirect, useNavigate } from "react-router-dom";
import socket from "@/Service/socket";
import { ColumnAPIs } from "@/Service/columnApi";
import { UserAPIs } from "@/Service/userApi";
import { toast } from "react-toastify";
import { invitationApis } from "@/Service/invitation";
import List from "@/components/Popper/List";
const cx = classNames.bind(styles);

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function Boards() {
  // lấy id param trên url
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  // set state để làm phần dragOverlay
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  // lưu lại columns cũ của card đã được kéo qua columns khác
  const [columnBeforeDragging, setColumnBeforeDragging] = useState(null);
  // columns đã được xử lý sau khi gọi api về
  const [orderedColumns, setOrderedColumns] = useState([]);
  // sau khi gọi api để thay đổi vị trí của id columns thì set lại trạng thái này để sắp xếp lại columns trong borads
  const [checkRenderOrderedColumns, setCheckRenderOrderedColumns] =
    useState(false);
  // bật tắt modal add user
  const [toggleModalAddUser, setToggleModalAddUser] = useState(false);
  // // bật tắt modal add user
  const [name, setName] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [toggleModalGenerateColumn, setToggleModalGenerateColumn] =
  //   useState(false);
  const [userInBoard, setUserInBoard] = useState([]);

  const findColumnsByCard = (ListColumns, idCard) => {
    return ListColumns.find((item) =>
      item?.cards?.map((card) => card._id)?.includes(idCard)
    );
  };

  useEffect(() => {
    if (name.length <= 0) {
      setName("");
      setListUsers([]);
      setSelectedUsers([]);
      return;
    }
    UserAPIs.search(name, id)
      .then((user) => {
        console.log("callApi", user);

        setListUsers(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  // Yêu cầu chuột di click và di chuyển 10px thì sự kiện mới được hoạt động
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 500 },
  });
  const sensor = useSensors(mouseSensor, touchSensor);

  const handleToggleModalAddUser = useCallback(() => {
    // Dọn dẹp state khi component bị hủy hoặc `name` thay đổi
    setName("");
    setListUsers([]);
    setSelectedUsers([]);
    setToggleModalAddUser(!toggleModalAddUser);
  }, [toggleModalAddUser]);

  // const handelToggleModalGenerateColumn = () => {
  //   setToggleModalGenerateColumn(!toggleModalGenerateColumn);
  // };

  useEffect(() => {
    //gọi API ở đây
    BoardsAPIs.fetchBoardDetailAPIs(id)
      .then((board) => {
        socket.emit("joinBoard", board._id.toString());
        const boardDetail = { board };

        setBoard(boardDetail);
        setOrderedColumns((preOrderColumns) => {
          // sắp xếp columns theo ColumnsOderedId lần đầu tiên khi bắt đầu chạy trương trình
          let OrderColumns = sort(board?.columns, board?.columnOrderIds, "_id");

          OrderColumns.forEach((column) => {
            column.cards = sort(column.cards, column.cardOrderIds, "_id");
            // Kiểm tra nếu column đó không có card nào thì mình add vào column đó 1 placehoder card để có thể kéo thả , cì mình chỉ thêm card mà không thêm cardOrderIds nên không ảnh hưởng đến Database
            if (column.cards.length === 0) {
              const cardPlaceholder = generatePlaceholderCard(column);
              // thêm placeholder card vào column rỗng
              column.cards.push(cardPlaceholder);
              //thêm Idplaceholdercard vào oderedCard
              // findColumnByActieCard.cardOrderIds.push(cardPlaceholder._id);
              console.log(column);
            }
          });

          return OrderColumns;
        });
      })
      .catch((err) => {
        console.error("Error fetchBoardDetailAPIs", err);
        return navigate("/error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRenderOrderedColumns]);

  // lấy những người trong boards
  useEffect(() => {
    BoardsAPIs.getUserByBoardId(id).then((users) => {
      setUserInBoard(users);
    });
  }, []);

  // kiểm tra nếu card mới được tạo hoặc vị trí card được thay đổi thì dùng useEffect này
  useEffect(() => {
    // nếu mà card mới được tạo thì api sẽ trả về card đó và mình sẽ tìm columns theo columnId là card trả về và push card vào column đó
    // logic...
    socket.on("newCard", (card) => {
      console.log(card);
      // const column = orderedColumns.find((column) => {
      //   return column._id === card.columnId;
      // });
      // console.log(column);

      setOrderedColumns((preColumns) => {
        return preColumns.map((column) => {
          if (column._id === card.columnId) {
            return {
              ...column,
              cards: [...column.cards, card], // Tạo một mảng cards mới
              cardOrderIds: [...column.cardOrderIds, card._id], // Tạo một mảng cardOrderIds mới
            };
          }
          return column;
        });
        // const column = preColumns.find((column) => {
        //   return column._id === card.columnId;
        // });
        // console.log(column);

        // if (column) {
        //   column.cards.push(card);
        //   column.cardOrderIds.push(card._id);
        // }

        // return [...preColumns];
      });
    });
    // nếu vị trí các card được thay đổi thì mình sẽ
  }, []);

  //update orderedColumns
  // khi nhận dữ liệu socket
  useEffect(() => {
    // Hàm xử lý CheckRenderOrderedIds
    const handleCheckRenderOrderedIds = (data) => {
      console.log("check response socket");
      setCheckRenderOrderedColumns((preColumnOrderIds) => !preColumnOrderIds);
    };
    // Hàm xử lý AddOrderedColumns
    const handleAddOrderedColumns = (newColumn) => {
      console.log(newColumn);
      newColumn.cards.push(generatePlaceholderCard(newColumn));
      setOrderedColumns((preColumns) => [...preColumns, newColumn]);
    };

    const handleDeleteOrderedColumns = (result) => {
      console.log(result);
      setOrderedColumns((preColumns) => {
        return preColumns.filter((column) => column._id !== result.columnId);
      });
    };

    const handleDeleteCard = (result) => {
      setOrderedColumns((preColumns) => {
        const columns = cloneDeep(preColumns);
        const column = findColumnsByCard(columns, result.cardId);
        column.cards = column.cards.filter(
          (card) => card._id !== result.cardId
        );
        return columns;
      });
    };
    // lấy dữ liệu mảng mới được tạo và trả về thông qua websocket và push nó vào trong orderedColumns là được
    socket.on("newColumn", handleAddOrderedColumns);

    socket.on("updateColumnOrderIds", handleCheckRenderOrderedIds);

    socket.on("newCardOrderIds", handleCheckRenderOrderedIds);

    socket.on("movingCards", handleCheckRenderOrderedIds);

    socket.on("updatedCard", handleCheckRenderOrderedIds);

    socket.on("deletedColumn", handleDeleteOrderedColumns);

    socket.on("deletedCard", handleDeleteCard);

    // xóa event đi khi người dùng rời khỏi board
    return () => {
      socket.off("newColumn", handleAddOrderedColumns);
      socket.off("updateColumnOrderIds", handleCheckRenderOrderedIds);
      socket.off("newCardOrderIds", handleCheckRenderOrderedIds);
      socket.off("deletedColumn", handleDeleteOrderedColumns);
      socket.off("deletedCard", handleDeleteCard);
      socket.emit("leaveBoard", id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInvitation = () => {
    // gọi api invite người dùng đến board này
    const userIds = selectedUsers.map((user) => user._id);
    console.log(userIds);

    invitationApis
      .createInvitation(userIds, id)
      .then((response) => {
        console.log(response);
        toast.success("sent invitation");
        setToggleModalAddUser(false);
        setName("");
        setListUsers([]);
        setSelectedUsers([]);
        // show thông báo thành công khi m��i người dùng vào board
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          navigate("/login");
        }
        // show thông báo l��i khi m��i người dùng vào board
      });
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemData(event?.active?.data?.current);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );

    //tìm kiếm column theo card đang bắt đầu được kéo
    const columnActiveDragging = findColumnsByCard(
      orderedColumns,
      event?.active?.id
    );
    // lưu lại column cũ để nhận biết card đang được thả ở trong 1 column hay chuyển sang column khác
    setColumnBeforeDragging(columnActiveDragging);
  };

  /* Để kéo chúng ta cần lấy id của của column mà card đang được kéo , id của column mà card đang over qua, giá trị của card và id của card đang được kéo và khi kéo qua thì sẽ xóa id và giá trị của card ở column cũ và thêm nó vào trong giá trị của column mới */
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    const {
      id: activeDraggingCard,
      data: { current: activeDraggingCardData },
    } = active;
    const {
      id: activeOverCard,
      data: { current: activeOverCardData },
    } = over;
    // Tìm column theo card id
    console.log(active);
    console.log(over);

    const columnActiveDragging = findColumnsByCard(
      orderedColumns,
      activeDraggingCard
    );
    const columnActiveOver = findColumnsByCard(orderedColumns, activeOverCard);

    // Kiểm tra nếu không có 1 trong 2 column active over thì chặn hoạt động phía dưới, hạn chế cras trang web
    if (!columnActiveDragging || !columnActiveOver) return;
    // nếu đã có 2 column thì làm tiếp
    if (columnActiveDragging !== columnActiveOver) {
      // kiếm index card đang được kéo trong column
      const IndexCardsInColumnActive = columnActiveDragging.cards.findIndex(
        (card) => card._id === activeDraggingCard
      );
      // kiếm index card đang được over trong columns
      const IndexCardsInColumnOver = columnActiveOver.cards.findIndex(
        (card) => card._id === activeOverCard
      );

      // console.log("giá trị cột mà card đang được kéo :", columnActiveDragging);
      // console.log("index card đang được kéo: ", IndexCardsInColumnActive);
      // console.log("giá trị cột mà card đang over :", columnActiveOver);
      // console.log("id card đang được kéo: ", activeDraggingCard);
      // console.log("index card đang được over: ", IndexCardsInColumnOver);
      // console.log("id card đang được over: ", activeOverCard);

      setOrderedColumns((preOrderColumns) => {
        const cloneOrderColumns = cloneDeep(preOrderColumns);

        //Xóa card được kéo ra khỏi column đang chưa nó
        //+ Tìm column chứa card đang được kéo
        let findColumnByActiveCard = cloneOrderColumns.find(
          (column) => column._id === columnActiveDragging._id
        );
        //Kiểm tra column này có tồn tại không ( Kiểm cho chắc :)) )
        if (findColumnByActiveCard) {
          //+ Thay đổi các mảng cards cũ bằng mảng cards đã được xóa card đang được active
          findColumnByActiveCard.cards = findColumnByActiveCard.cards.filter(
            (card, index) => index !== IndexCardsInColumnActive
          );
          // Xóa id card đang được kéo trong mảng cardOrderIds của column đang chứa card đang được kéo
          findColumnByActiveCard.cardOrderIds =
            findColumnByActiveCard.cardOrderIds.filter(
              (idCard) => idCard !== activeDraggingCard
            );
        }
        //Kiểm tra trong column mà card đang được kéo đi đó có còn card nào không nếu không thì cho thêm card phụ (placeholder card) vào để dữ chỗ kéo thả
        if (findColumnByActiveCard.cards.length === 0) {
          const cardPlaceholder = generatePlaceholderCard(
            findColumnByActiveCard
          );
          // thêm placeholder card vào column rỗng
          findColumnByActiveCard.cards.push(cardPlaceholder);
          //thêm Idplaceholdercard vào oderedCard
          // findColumnByActieCard.cardOrderIds.push(cardPlaceholder._id);
        }

        //+ Tìm column chứa card đang được kéo
        let findColumnByOverCard = cloneOrderColumns.find(
          (column) => column._id === columnActiveOver._id
        );
        //Kiểm tra column này có tồn tại không ( Kiểm cho chắc :)) )
        if (findColumnByOverCard) {
          // kiểm tra xem card đã kéo có nằm trong overColumn chưa nếu đã có thì xóa nó đi
          findColumnByOverCard.cards = findColumnByOverCard.cards.filter(
            (card) => card._id !== IndexCardsInColumnActive
          );

          // Thêm card đang kéo vào column đang được card over
          delete activeDraggingCardData.sortable;
          findColumnByOverCard.cards.push(activeDraggingCardData);
          // Thêm id card đang kéo vào mảng cardOrderIds của column đang được card over
          findColumnByOverCard.cardOrderIds.push(activeDraggingCard);
          // Xóa card placeholder ở column đang được over
          findColumnByOverCard.cards = findColumnByOverCard.cards.filter(
            (card) => !card?.FE_placehoder_card
          );
        }
        return [...cloneOrderColumns];
      });
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;
    // Kiểm tra hành động kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // khi kéo thả cards
      const cloneOrderedColumns = cloneDeep(orderedColumns);
      const {
        id: idCardActive,
        data: { current: dataCardActive },
      } = active;
      const {
        id: idCardOver,
        data: { current: dataCardOver },
      } = over;

      // console.log("đang kéo thả cards");
      // console.log("active card: ", active);
      // console.log("over card: ", over);
      // Kiểm tra card có được kéo từ column này sang column khác không hay chỉ trong 1 column
      if (
        columnBeforeDragging._id ===
        findColumnsByCard(orderedColumns, idCardOver)?._id
      ) {
        //Kéo thả trong cùng 1 column
        //+ tìm kiếm column theo card trong mảng đã được clone

        const columnCardDraging = findColumnsByCard(
          cloneOrderedColumns,
          idCardActive
        );
        const cardOrderIds = columnCardDraging.cardOrderIds;
        // sắp xếp lại các id card đang được kéo và id card đang over
        const indexCardDraging = cardOrderIds?.indexOf(idCardActive);
        const indexCardOver = cardOrderIds?.indexOf(idCardOver);
        // Thay đổi vị trí của 2 id card đang được kéo và over
        if (indexCardDraging >= 0 && indexCardOver >= 0) {
          columnCardDraging.cardOrderIds = arrayMove(
            cardOrderIds,
            indexCardDraging,
            indexCardOver
          );
        }

        // thay đổi mảng cards trong columns
        const listCards = columnCardDraging.cards;
        // Tìm index của card đang được kéo và card đang được over
        const indexObjCardDraging = listCards.findIndex(
          (card) => card._id === idCardActive
        );
        const indexObjCardOver = listCards.findIndex(
          (card) => card._id === idCardOver
        );
        columnCardDraging.cards = arrayMove(
          columnCardDraging.cards,
          indexObjCardDraging,
          indexObjCardOver
        );

        // Gọi api để set lại mảng cardOrderIds trong columns
        //1: lấy được cardOrderIds ở phía trên sau khi đã được thay đổi columnCardDraging.cardOrderIds
        //2: Gọi lên api với id columnCardDraging._id
        //3: Cập nhật lại orderedColumns và set lại state orderedColumns
        ColumnAPIs.updateColumnOrderIds(columnCardDraging._id, {
          cardOrderIds: columnCardDraging.cardOrderIds,
        }).then((column) => {
          console.log(column);
        });

        setOrderedColumns(cloneOrderedColumns);
        //+ lấy id của card đang được active
      } else {
        //các bước thực hiện để kéo thả 1 card khác column
        //-Lấy id của card đang được active
        //-Lấy id của card đang được over
        //-lấy được column card đang được chuyển qua
        //- Kiểm tra vị trí card đang được over trong orderedCardsIds
        //- Kiểm tra vị trí card đang được active trong orderedCards( là sẽ nằm cuối mảng vì khi kéo qua thì sẽ push card đang được kéo vào columns đang over)
        //- Thay đổi vị trí của 2 id card đang được active và over
        //- Lưu lại orderedColumns và set lại state orderedColumns

        //1-Lấy id của card đang được active
        // //2-Lấy id của card đang được over
        // console.log("id card đang được active: ", idCardActive);
        // console.log("id card đang được over: ", idCardOver);

        //3-Lấy được column card đang được chuyển qua
        // console.log("column card đang được chuyển qua: ", dataCardOver);
        // tìm column mà activeCard vừa được chuyển qua
        const columnOverCard = cloneOrderedColumns.find((column) =>
          column.cards.map((card) => card._id).includes(idCardOver)
        );
        // console.log("column vừa được card chuyển qua: ", columnOverCard);
        //4- Kiểm tra vị trí card đang được over trong orderedCardsIds
        // console.log(
        //   "index card đang được over trong orderedCards: ",
        //   columnOverCard.cardOrderIds.indexOf(idCardOver)
        // );
        //5- Kiểm tra vị trí card đang được active trong orderedCards( là s�� n��m cuối mảng)
        // console.log(
        //   "index card đang được active trong orderedCards: ",
        //   columnOverCard.cardOrderIds.indexOf(idCardActive)
        // );
        //6- Thay đ��i vị trí của 2 id card đang được active và over
        if (!columnOverCard?.cardOrderIds) {
          return;
        }
        columnOverCard.cardOrderIds = columnOverCard.cardOrderIds
          ? arrayMove(
              columnOverCard.cardOrderIds,
              columnOverCard.cardOrderIds.indexOf(idCardActive),
              columnOverCard.cardOrderIds.indexOf(idCardOver)
            )
          : columnOverCard.cardOrderIds;

        const listCards = columnOverCard.cards;
        // Tìm index của card đang được kéo và card đang được over
        const indexObjCardDraging = listCards.findIndex(
          (card) => card._id === idCardActive
        );
        const indexObjCardOver = listCards.findIndex(
          (card) => card._id === idCardOver
        );
        columnOverCard.cards = arrayMove(
          columnOverCard.cards,
          indexObjCardDraging,
          indexObjCardOver
        );

        //khi bắt đầu thả xuống mình sẽ xóa card giữ chỗ ở column mà card vừa được thêm vào
        // columnOverCard.
        setOrderedColumns(cloneOrderedColumns);

        const currentCard = idCardActive;

        // lấy id columns mà card đã được kéo ra
        const idColumnsPrevColumn = columnBeforeDragging._id;

        // lấy cardOrderIds của columns mà card đã được kéo ra
        const cardOrderedPrevColumn = cloneOrderedColumns.find((c) => {
          return c._id === columnBeforeDragging._id;
        })?.cardOrderIds;
        // lấy id columns mà card đã được thêm vào
        const idColumnsNextColumn = cloneOrderedColumns.find((c) => {
          return (
            c._id === findColumnsByCard(cloneOrderedColumns, idCardActive)?._id
          );
        })?._id;
        // lấy cardOrderIds của columns mà card đã được thêm vào
        const cardOrderedsNextColumn = cloneOrderedColumns.find((c) => {
          return (
            c._id === findColumnsByCard(cloneOrderedColumns, idCardActive)?._id
          );
        })?.cardOrderIds;

        // console.log("idColumnsPrevColumn", idColumnsPrevColumn);
        // console.log("cardOrderidsPrevColumn", cardOrderedPrevColumn);
        // console.log("idColumnsNextColumn", idColumnsNextColumn);
        // console.log("cardOrderidsNextColumn", cardOrderidsNextColumn);

        // gọi api thay đổi card
        ColumnAPIs.supportMoveCardsBetweenColumns({
          currentCard,
          idColumnsPrevColumn,
          cardOrderedPrevColumn,
          idColumnsNextColumn,
          cardOrderedsNextColumn,
        })
          .then(() => {
            console.log("â");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    // Khi kéo thả columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex(
          (item) => item._id === active.id
        );
        const newIndex = orderedColumns.findIndex(
          (item) => item._id === over.id
        );
        //Thay đổi vị trí các columns theo vị trí được active và over
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
        const columnOrderIds = dndOrderedColumns.map((column) => {
          return column._id;
        });

        // Khi bắt đầu thay đổi thì sẽ gọi api để thay đổi columnsOrderIds trên mongodb
        BoardsAPIs.updateBoardDetailAPIs(id, { columnOrderIds }).then(() => {
          socket.emit("updateColumnOrderIds", { id, columnOrderIds });
        });
        setOrderedColumns(dndOrderedColumns);
      }
    }
    // logic kéo thả columns

    // nếu vị trí sau khi thả không tồn tại (Null) thì nó sẽ return lun không cần làm những cái phía dưới nữa

    // Khi thả box ra thì tất cả các giá trị về lại null
    setActiveDragItemId(null);
    setActiveDragItemData(null);
    setActiveDragItemType(null);
  };

  return (
    <>
      {toggleModalAddUser && (
        <Modal onClick={handleToggleModalAddUser} className={cx("box-modal")}>
          <div className={cx("modal-add-user")}>
            <h3 className={cx("title")}>Chia sẻ bảng</h3>
            <div className={cx("box-add")}>
              <div className={cx("box-input")}>
                {selectedUsers.map((user, index) => {
                  return (
                    <span key={index} className={cx("chip")}>
                      {user.name}
                      <Button
                        onClick={() => {
                          setSelectedUsers((pre) => {
                            const userChoose = pre.filter(
                              (pre) => pre.name !== user.name
                            );
                            return userChoose;
                          });
                        }}
                        className={cx("delete-chip")}
                      >
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={faXmark}
                        ></FontAwesomeIcon>
                      </Button>
                    </span>
                  );
                })}

                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cx("search-user")}
                  placeholder="Địa chỉ email hoặc tên "
                />
              </div>
              <List listItem={userInBoard}>
                <div className={cx("box-list-user")}>
                  <Button
                    className={cx("list-user")}
                    rightIcon={
                      <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                    }
                  >
                    Thành viên
                  </Button>
                </div>
              </List>
              <Button onClick={handleInvitation} className={cx("button-share")}>
                Chia sẻ
              </Button>
            </div>
            <ul className={cx("user-results-list")}>
              {listUsers.map((user, index) => {
                return (
                  <Fragment key={index}>
                    <Button
                      onClick={() => {
                        setSelectedUsers((pre) => {
                          const checkUser = pre.find((u) => u._id === user._id);
                          if (checkUser) {
                            return [...pre];
                          }
                          return [
                            ...pre,
                            { _id: user._id, name: user.username },
                          ];
                        });
                      }}
                      className={cx("result-user")}
                    >
                      {user.username}
                      <span> # {user._id}</span>
                    </Button>
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </Modal>
      )}
      <BoardBar onClick={handleToggleModalAddUser} data={board} />

      <DndContext
        sensors={sensor}
        collisionDetection={closestCorners}
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
