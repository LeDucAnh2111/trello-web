/* eslint-disable react-hooks/rules-of-hooks */
import BoardBar from "@/Pages/Table/components/BoardBar";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/Input";
import Menu from "@/components/Popper/Menu";
import { useState } from "react";

function Table() {
  const cx = classNames.bind(styles);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };
  console.log("checkToggleModal");
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
      <BoardBar onClick={handleToggleModal} />
      <div className={cx("content")}></div>
    </>
  );
}

export default Table;
