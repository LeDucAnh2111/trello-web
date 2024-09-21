import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import { StrictMode, useEffect, useState } from "react";
import Button from "@/components/Button";
import classNames from "classnames/bind";
import style from "./invitationBox.module.scss";
import { formatDate } from "@/util/formatDate";
import { invitationApis } from "@/Service/invitation";
import { toast } from "react-toastify";
import socket from "@/Service/socket";

const cx = classNames.bind(style);
const InvitationBox = ({ listInvitation, className, children }) => {
  const items = listInvitation || [];
  console.log(listInvitation);

  const handleAcceptInvitation = (status, boardId) => {
    // Accept invitation logic
    invitationApis
      .updateInvitation(status, boardId)
      .then(() => {
        if (status === "accepted") {
          toast.success("joined the board");
        } else {
          toast.error("refuse to join the board");
        }
      })
      .catch((err) => {
        console.log(">>>>>>>>", err);
      });
  };

  return (
    <div>
      <Tippy
        hideOnClick={false}
        trigger="mouseenter"
        duration={[200, 100]}
        delay={[200, 100]}
        interactive
        offset={[0, 10]}
        placement="bottom-start"
        onClickOutside={(instance) => instance.hide()}
        render={(attrs) => (
          <div className={cx("content", className)} tabIndex="-1" {...attrs}>
            {
              <PopperWrapper>
                {items.map((item, index) => (
                  <StrictMode key={index}>
                    <div className={cx("result")}>
                      <div className={cx("box-invitation")}>
                        <div className={cx("content-invitation")}>
                          <div className={cx("name")}>
                            {item.invitedByFullName}
                          </div>
                          <div className={cx("email")}>
                            {item.invitedByEmail}
                          </div>
                          <div className={cx("invitation")}>
                            đang mời bạn vào Không gian làm việc{" "}
                            <span>{item.boardTitle}</span>
                          </div>
                          <div className={cx("date")}>
                            {formatDate(item.dateSent)}
                          </div>
                        </div>
                        <div className={cx("btn")}>
                          <Button
                            onClick={() => {
                              handleAcceptInvitation("accepted", item.boardId);
                            }}
                            className={cx("button", "btn-accept")}
                          >
                            Accept
                          </Button>{" "}
                          <Button
                            onClick={() => {
                              handleAcceptInvitation("declined", item.boardId);
                            }}
                            className={cx("button", "btn-reject")}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </StrictMode>
                ))}
              </PopperWrapper>
            }
          </div>
        )}
      >
        <div className={cx("w-child")}>{children}</div>
      </Tippy>
    </div>
  );
};

export default InvitationBox;
