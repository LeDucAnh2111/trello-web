/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { UserAPIs } from "@/Service/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState(false);
  const [error, setError] = useState("");
  const handleTypePassword = () => {
    setTypePassword(!typePassword);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // TODO: call API register
    console.log("Register success", userName, email, password);
    if (userName.length <= 0 || email.length <= 0 || password.length <= 0) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    UserAPIs.register({ username: userName, email, password })
      .then((response) => {
        console.log("dsaddd");

        toast.success("Registered");
        navigate("/login");
      })
      .catch((err) => {
        if ((err.response.status = 401)) {
          setError("Vui lòng nhập đúng trường email");
          return;
        }
        setError("Tên đăng nhập hoặc mật khẩu đã sử dụng");
      });
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("box-register")}>
          <div className={cx("header-register")}>
            <div className={cx("logo")}>
              <div className={cx("logo-img")}>
                <img
                  src={
                    "./logoTrello/png-transparent-trello-social-icons-icon-thumbnail.png"
                  }
                  alt="logo"
                ></img>
              </div>
              <div className={cx("logo-title")}>Trello</div>
            </div>
            <div className={cx("title")}> Đăng nhập để tiếp tục </div>
          </div>
          <div className={cx("content")}>
            <Input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              className={cx("form-register")}
              placeholder={"Nhập tên sử dụng"}
            />
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              className={cx("form-register")}
              placeholder={"Nhập email của bạn"}
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={!typePassword ? "password" : "text"}
              className={cx("form-register")}
              placeholder={"Nhập mật khẩu của bạn"}
            />
            <a onClick={handleTypePassword}>
              {!typePassword ? "Xem mật khẩu" : "Ẩn mật khẩu"}
            </a>
            {error && <div className={cx("err")}>{error}</div>}
            <Button className={cx("register")} onClick={handleSubmitRegister}>
              Đăng ký
            </Button>
          </div>

          <div className={cx("or")}>
            <Button className={cx("type")}>
              <div className={cx("box-logo-gg")}>
                <img src={"./logoTrello/google-icon.svg"} />
              </div>
              Google
            </Button>
          </div>
          <p className={cx("text-register")}>
            Nếu bạn chưa có tài khoản thì có thể <a href="">Đăng ký</a>
          </p>
          <div className={cx("footer-register")}>
            <div className={cx("brand")}>
              <img
                src={"./logoTrello/2560px-Atlassian-logo.svg.png"}
                alt="logo"
              ></img>
            </div>
            <div className={cx("contact")}>
              Trang này được bảo vệ bởi reCAPTCHA và tuân theo Chính sách quyền
              riêng tư và Điều khoản dịch vụ của Google.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
