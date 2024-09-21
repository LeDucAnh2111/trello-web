import { Fragment, useEffect, useState } from "react";
import socket from "@/Service/socket";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { listSidebar } from "./listSidebar";
import { BoardsAPIs } from "@/Service/boardApi";
import { formatDate } from "@/util/formatDate";
import { Link, useNavigate } from "react-router-dom";
import ModalCreateBoard from "./components/ModalCreartBoard";

const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate();
  const [stateHome, setStateHome] = useState("boards");
  const [typeBoards, setTypeBoards] = useState("Bảng của tôi");
  const [listBoards, setListBoards] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [role, setRole] = useState("admin");
  const [query, setQuery] = useState(1);
  const [checkInvitations, setCheckInvitations] = useState(false);
  const [toggleModalCreateBoard, setToggleModalCreateBoard] = useState(false);

  const handleToggleModalCreateBoard = () => {
    setToggleModalCreateBoard(!toggleModalCreateBoard);
  };
  useEffect(() => {
    BoardsAPIs.getByOfUser(role, query)
      .then((res) => {
        const pages = [];
        for (let index = 1; index <= Math.ceil(res.totalCount / 12); index++) {
          pages.push(index);
        }
        socket.emit("joinUser", res.userId);
        console.log(">>>>>> listBoards", res.pagedData);

        setListBoards(res.pagedData);
        setPageCount(pages);
      })
      .catch((err) => {
        // console.error("Error fetchBoardDetailAPIs", err);
        return navigate("/login");
      });
  }, [role, query, checkInvitations]);

  // const handelCheckInvitations = () => {
  //   setCheckInvitations(!checkInvitations);
  // };
  useEffect(() => {
    socket.on("updateInvitations", (data) => {
      setCheckInvitations((pre) => !pre);
    });
    socket.on("createBoardResponse", (data) => {
      setCheckInvitations((pre) => !pre);
    });
  }, []);

  const handelRole = (role, title) => {
    setRole(role);
    setTypeBoards(title);
  };

  return (
    <div className={cx("container")}>
      {toggleModalCreateBoard && (
        <ModalCreateBoard onClick={handleToggleModalCreateBoard} />
      )}
      <div className={cx("sidebar")}>
        <ul className={cx("menu")}>
          {listSidebar.map((item, index) => {
            return (
              <li key={index} className={cx("item-menu")}>
                <Button
                  onClick={() => {
                    setStateHome(item.state);
                    if (item.state === "creates") {
                      handleToggleModalCreateBoard();
                    }
                  }}
                  className={cx("button-menu", {
                    "button-menu-active": item.state === stateHome,
                  })}
                  leftIcon={item.icon}
                >
                  {item.content}
                </Button>
              </li>
            );
          })}
        </ul>
        <ul className={cx("boards-type")}>
          <Button
            className={cx("item")}
            onClick={() => handelRole("admin", "Bảng của tôi")}
          >
            <div className={cx("type-logo")}>T</div>
            <div className={cx("title-type")}>Bảng của tôi</div>
          </Button>
          <Button
            className={cx("item")}
            onClick={() => handelRole("member", "Bảng tham gia")}
          >
            <div className={cx("type-logo", "type-logo-background")}>T</div>
            <div className={cx("title-type")}>Bảng tham gia</div>
          </Button>
        </ul>
      </div>
      <div className={cx("content")}>
        <div className={cx("title")}>{typeBoards}</div>
        <div className={cx("list-boards")}>
          {listBoards.length > 0 &&
            listBoards.map((board, index) => {
              return (
                <div
                  key={index}
                  className={cx("board", {
                    "background-green": role === "member",
                  })}
                >
                  <div className={cx("info-board")}>
                    <Link
                      to={`/boards/${board._id}`}
                      title={board.title}
                      className={cx("board-title")}
                    >
                      {board.title}
                    </Link>
                    <div className={cx("descript")}>
                      {board.description ||
                        `Test descript boards Test descript boards Test descript boards Test descript boards`}
                    </div>
                    <div className={cx("order-info")}>
                      <div className={cx("createAt")}>
                        {formatDate(board.createdAt)}
                      </div>
                      <div className={cx("member")}>
                        <span>
                          <FontAwesomeIcon icon={faEye} />
                        </span>
                        {board?.members || 0}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={cx("page-board")}>
          {" "}
          <Button className={cx("navigation")}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          {pageCount.map((item, index) => {
            return (
              <span
                onClick={() => {
                  setQuery(index + 1);
                }}
              >
                {item}
              </span>
            );
          })}
          <Button className={cx("navigation")}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
