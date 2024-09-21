/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { UserAPIs } from "@/Service/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const handleTypePassword = () => {
    setTypePassword(!typePassword);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // TODO: call API login
    const user = { username: userName, password: password };
    UserAPIs.login(user)
      .then((response) => {
        toast.success("User logged in successfully");
        return navigate("/");
      })
      .catch((err) => {
        setCheckError(true);
        console.log(err);
      });
  };

  console.log(password);

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("box-login")}>
          <div className={cx("header-login")}>
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
              className={cx("form-login")}
              placeholder={"Nhập email của bạn"}
            />
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={!typePassword ? "password" : "text"}
              className={cx("form-login")}
              placeholder={"Nhập mật khẩu của bạn"}
            />
            <a onClick={handleTypePassword}>
              {!typePassword ? "Xem mật khẩu" : "Ẩn mật khẩu"}
            </a>
            {checkError && (
              <div className={cx("err")}>
                {" "}
                Tài khoản hoặc mật khẩu không đúng
              </div>
            )}
            <Button onClick={handleSubmitLogin} className={cx("register")}>
              Đăng nhập
            </Button>
          </div>

          <div className={cx("or")}>
            <Button
              className={cx("type")}
              onClick={() => {
                window.location.href = "http://localhost:3000/v1/auth/google";
              }}
            >
              <div className={cx("box-logo-gg")}>
                <img src={"./logoTrello/google-icon.svg"} />
              </div>
              Google
            </Button>
          </div>
          <p className={cx("text-login")}>
            Nếu bạn chưa có tài khoản thì có thể <a href="">Đăng ký</a>
          </p>
          <div className={cx("footer-login")}>
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

export default Login;
