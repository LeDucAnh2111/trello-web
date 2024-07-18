import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Button from "@/components/Button";
import { StrictMode, memo } from "react";

const cx = classNames.bind(styles);
function Menu({ children, listItem, className, toggle }) {
  const items = listItem || [];
  if (items.length > 0) {
    return (
      <Tippy
        hideOnClick={false}
        delay={200}
        interactive
        offset={[0, 10]}
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx("content", className)} tabIndex="-1" {...attrs}>
            {
              <PopperWrapper>
                {items.map((item, index) => (
                  <StrictMode key={index}>
                    {item.separating && <hr />}
                    <Button
                      classNames={cx("item")}
                      key={index}
                      leftIcon={item.leftIcon}
                      onClick={item.onClick}
                    >
                      {item.title}
                    </Button>
                  </StrictMode>
                ))}
              </PopperWrapper>
            }
          </div>
        )}
      >
        <div className={cx("w-child")}>{children}</div>
      </Tippy>
    );
  } else {
    return <div className={cx("w-child")}>{children}</div>;
  }
}

export default memo(Menu);
