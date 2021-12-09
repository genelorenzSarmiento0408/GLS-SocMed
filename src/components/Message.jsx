import classNames from "classnames";
import React from "react";
import { useAuthState } from "../context/auth";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;

  return (
    <OverlayTrigger
      placement={sent ? "right" : "left"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}
        </Tooltip>
      }
      transition={false}
    >
      <div
        className={classNames("d-flex my-3", {
          "ms-auto": sent,
          "me-auto": received,
        })}
      >
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": received,
          })}
        >
          <p className={classNames({ "text-white": sent })}>
            {message.content}
          </p>
        </div>
      </div>
    </OverlayTrigger>
  );
}
