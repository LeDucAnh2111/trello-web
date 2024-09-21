/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import Button from "@/components/Button";
import { memo, StrictMode } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Search({ className, children, listSearch, showListSearch }) {
  const navigate = useNavigate();
  const items = listSearch || [];
  return (
    <Tippy
      visible={listSearch?.length > 0}
      interactive
      delay={[0, 100]}
      render={(attrs) => (
        <div className={cx("content", className)} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("wrapper-result")}>
            {items.map((item, index) => {
              return (
                <StrictMode key={index}>
                  <Button
                    onClick={() => {
                      navigate(`/boards/${item._id}`);
                    }}
                    className={cx("result")}
                  >
                    <div className={cx("item")}>
                      <img src="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg" />
                      <div className={cx("contents")}>
                        <div className={cx("title-result")}>{item?.title}</div>
                        <div className={cx("description")}>
                          Trello không gian làm việc
                        </div>
                      </div>
                    </div>
                  </Button>
                </StrictMode>
              );
            })}
          </PopperWrapper>
        </div>
      )}
    >
      <div>{children}</div>
    </Tippy>
  );
}

export default memo(Search);
