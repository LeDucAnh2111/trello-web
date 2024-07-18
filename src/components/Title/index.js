import Tippy from "@tippyjs/react";

function Title({ children, title }) {
  return (
    <Tippy placement="bottom" content={title}>
      {children}
    </Tippy>
  );
}

export default Title;
