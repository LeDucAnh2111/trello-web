import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function Button(
  {
    to,
    href,
    primary = false,
    outline = false,
    disabled = false,
    rounded = false,
    leftIcon,
    rightIcon,
    classNames,
    children,
    ...events
  },
  ref
) {
  if (primary && outline) {
    outline = false;
  }

  if (disabled) {
    Object.keys(events).forEach((key) => {
      if (key.startsWith("on") && events[key] === "function") {
        delete events[key];
      }
    });
  }
  let Card = "button";
  let className = cx("wrapper", {
    [classNames]: classNames,
    primary,
    outline,
    rounded,
    disabled,
  });
  if (to) {
    Card = Link;
  } else if (href) {
    Card = "a";
  }
  return (
    <Card className={className} href={href} {...events} ref={ref}>
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </Card>
  );
}

export default forwardRef(Button);
