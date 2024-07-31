import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import Button from "@/components/Button";
import { memo, useState } from "react";

const cx = classNames.bind(styles);

function Search({ className, children, listSearch, showListSearch }) {
  return (
    <Tippy
      visible={listSearch?.length > 0}
      interactive
      delay={[0, 100]}
      render={(attrs) => (
        <div className={cx("content", className)} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("wrapper-result")}>
            <Button className={cx("result")}>
              <div className={cx("item")}>
                <img src="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg" />
                <div className={cx("contents")}>
                  <div className={cx("title-result")}>Test</div>
                  <div className={cx("description")}>
                    Trello không gian làm việc
                  </div>
                </div>
              </div>
            </Button>
            <Button className={cx("result")}>
              <div className={cx("item")}>
                <img src="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg" />
                <div className={cx("contents")}>
                  <div className={cx("title-result")}>
                    A Lead Management Pipeline by Crmble
                  </div>
                  <div className={cx("description")}>
                    Trello không gian làm việc
                  </div>
                </div>
              </div>
            </Button>
            <Button className={cx("result")}>
              <div className={cx("item")}>
                <img src="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg" />
                <div className={cx("contents")}>
                  <div className={cx("title-result")}>Test</div>
                  <div className={cx("description")}>
                    Trello không gian làm việc
                  </div>
                </div>
              </div>
            </Button>
          </PopperWrapper>
        </div>
      )}
    >
      <div>{children}</div>
    </Tippy>
  );
}

export default memo(Search);
