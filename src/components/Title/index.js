import Tippy from "@tippyjs/react";

function Title({ children, title }) {
  return <Tippy content={title}>{children}</Tippy>;
}

export default Title;
