// const { default: Button } = require("@/components/Button");
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import styles from "./ModalCreateBoard.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { BoardsAPIs } from "@/Service/boardApi";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const ModalCreateBoard = ({ ...events }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleCreateBoard = () => {
    console.log("Create board", { name, description });
    if (name === "" || description === "") {
      setError("Please fill all the fields!!!");
      return;
    }
    if (name.length < 5 || description.length < 5) {
      setError("Name and description must be 5 characters or longer!!!");
      return;
    }
    BoardsAPIs.createBoard({ title: name, description: description })
      .then(() => {
        setError("");
        setName("");
        setDescription("");
        events.onClick();
      })
      .catch(() => {
        navigate("/login");
      });
  };

  return (
    <Modal isOpen={true} className={cx("container")} {...events}>
      <div className={cx("title")}>Create a new board</div>
      <div className={cx("group-input")}>
        <div className={cx("label-input")}>Name :</div>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cx("input")}
          placeholder="Name your the board"
        />
      </div>
      <div className={cx("group-input")}>
        <label className={cx("label-input")}>Description :</label>

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cx("input")}
          placeholder="Description your the board"
        />
      </div>
      {error.length > 0 && <div className={cx("error")}>{error}</div>}
      <div className={cx("box-btn")}>
        <Button
          onClick={handleCreateBoard}
          className={cx("btn")}
          color="primary"
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default ModalCreateBoard;
