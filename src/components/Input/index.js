import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const cx = classNames.bind(styles);

const Input = ({
  type = "text",
  search = false,
  placeholder = "",
  value,
  className = "",
  ...events
}) => {
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
        value={value}
        placeholder={placeholder}
        {...events}
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
};

Input.propTypes = {
  type: PropTypes.string,
  search: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default memo(Input);
