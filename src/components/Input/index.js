import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Input({
  type = "text",
  search = false,
  placeholder = "",
  value,
  onChange = null,
  className = "",
}) {
  let classList = cx("box-input", {
    [className]: className,
    [type]: type,
    search,
  });

  return (
    <div className={classList}>
      <input
        type={type}
        id="input"
        placeholder={placeholder}
        onChange={onChange}
      />
      {search && (
        <label htmlFor="input">
          <FontAwesomeIcon
            className={cx("icon")}
            icon={faSearch}
          ></FontAwesomeIcon>
        </label>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  search: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Input;
