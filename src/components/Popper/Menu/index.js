import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Button from "@/components/Button";
import { StrictMode } from "react";

const cx = classNames.bind(styles);
function Menu({ children, listItem, className }) {
  const items = listItem || [];
  if (items.length > 0) {
    return (
      <Tippy
        // hideOnClick={false}s
        delay={500}
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
        <div>{children}</div>
      </Tippy>
    );
  } else {
    return <div>{children}</div>;
  }
}

export default Menu;
