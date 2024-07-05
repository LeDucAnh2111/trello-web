/* eslint-disable react/jsx-no-duplicate-props */
// import "@/output.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { faChevronDown, faList } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.modue.scss";
import Button from "@/components/Button";

import MenuDataList from "./MenuDataList";
import Menu from "@/components/Popper/Menu";
import Input from "@/components/Input";
import { faBell, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import Title from "@/components/Title";
import Search from "@/components/Popper/Search";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
const cx = classNames.bind(styles);
function Header() {
  const [valueSearch, setValueSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [showListSearch, setShowListSearch] = useState(false);

  useEffect(() => {
    if (valueSearch === "") {
      if (showListSearch) setShowListSearch(false);
      if (listSearch.length > 0) setListSearch([]);
    } else {
      if (!showListSearch) setShowListSearch(true);
      if (listSearch.length === 0) setListSearch([1, 2, 3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch]);

  const handleSearch = useCallback((e) => {
    setValueSearch(e.target.value);
  }, []);

  const menuItems = useMemo(() => MenuDataList, []);

  return (
    <div
      className={cx(
        "header",
        "container flex justify-between items-center  px-4"
      )}
    >
      <div
        className={cx("header-left", "flex items-center justify-between gap-5")}
      >
        <div className="list-group">
          <FontAwesomeIcon icon={faList} className="text-white text-3xl" />
        </div>
        <div className={cx("logo")}>
          <img
            src="https://trello.com/assets/d947df93bc055849898e.gif"
            alt="logo"
          />
        </div>
        <div className={cx("box-menu")}>
          <ul className={cx("menu", " flex justify-around gap-3")}>
            {menuItems.map((item, index) => (
              <li key={index} className={cx("item")}>
                <Menu
                  listItem={item.listitemChild}
                  className={cx("wrapper-itemChild")}
                >
                  <Button
                    rightIcon={item.rightIcon}
                    leftIcon={item.leftIcon}
                    classNames={cx("button")}
                  >
                    {item.title}
                  </Button>
                </Menu>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={cx(
          "header-right",
          "flex items-center justify-between gap-5"
        )}
      >
        <div>
          <Search
            className={cx("search-result")}
            listSearch={listSearch}
            showListSearch={showListSearch}
          >
            <Input
              onChange={handleSearch}
              className={cx("CompSearch")}
              search
              placeholder="Search..."
              value={valueSearch}
            />
          </Search>
        </div>
        <div className={cx("box-icon bell")}>
          <Title title="Thông báo">
            <FontAwesomeIcon className={cx("icon bell")} icon={faBell} />
          </Title>
        </div>
        <div className={cx("box-icon ")}>
          <Title title="Thông tin">
            <FontAwesomeIcon className={cx("icon")} icon={faCircleQuestion} />
          </Title>
        </div>
        <Title title="Tài khoản">
          <div className={cx("box-avatar user")}>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
              alt="avatar"
              className={cx("avatar")}
            />
          </div>
        </Title>
      </div>
    </div>
  );
}

export default memo(Header);
