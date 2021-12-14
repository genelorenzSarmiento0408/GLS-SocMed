import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useAuthState } from "../context/auth";
import { useMessageDispatch } from "../context/message";
import moment from "moment";
import {
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
  Popover,
} from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

export default function Message({ message }) {
  const { user } = useAuthState();
  const dispatch = useMessageDispatch();
  const sent = message.from === user.username;
  const received = !sent;
  const [showPopover, setShowPopover] = useState(false);
  const reactionIcons = [...new Set(message.reactions.map((r) => r.content))];

  const [reactToMessage, { data: reactionData, error: reactionError }] =
    useMutation(REACT_TO_MESSAGE, {
      onError: (err) => console.error(err),
      onCompleted: (data) => setShowPopover(false),
    });
  useEffect(() => {
    if (reactionError) console.log(reactionError);

    if (reactionData) {
      const reaction = reactionData.reactToMessage;
      const otherUser =
        user.username === reaction.message.to
          ? reaction.message.from
          : reaction.message.to;

      dispatch({
        type: "ADD_REACTION",
        payload: {
          username: otherUser,
          reaction,
        },
      });
    }
  }, [
    reactionError,
    reactionData,
    user.username,
    dispatch,
    message.from,
    message.to,
  ]);
  const react = (reaction) => {
    reactToMessage({ variables: { id: message.id, content: reaction } });
  };
  const reactButton = (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopover}
      onToggle={setShowPopover}
      transition={false}
      rootClose
      overlay={
        <Popover className="rounded-pill">
          <Popover.Content className="d-flex px-0 py-1 align-items-center react-button-popover">
            {reactions.map((reaction) => (
              <Button
                variant="link"
                className="react-icon-button"
                key={reaction}
                onClick={() => react(reaction)}
              >
                {reaction}
              </Button>
            ))}
          </Popover.Content>
        </Popover>
      }
    >
      <Button
        variant="link"
        className={classNames("px-2", {
          "float-end": received,
        })}
      >
        <FontAwesomeIcon icon={faSmile} />
      </Button>
    </OverlayTrigger>
  );

  let picvalidator =
    /([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(?:jpg|gif|png|jfif|jpeg)?$/i;
  let validator = picvalidator.test(message.content);

  return (
    <div
      className={classNames("d-flex my-3", {
        "ms-auto": sent,
        "me-auto": received,
      })}
    >
      {" "}
      {reactButton}
      <OverlayTrigger
        placement={sent ? "right" : "left"}
        overlay={
          <Tooltip>
            {moment(message.createdAt).format("MMMM DD, YYYY  h:mm a")}
          </Tooltip>
        }
        transition={false}
      >
        {validator ? (
          <>
            <div className="position-relative">
              <Image alt="" src={message.content} />
              {message.reactions.length > 0 && (
                <div className="reactions-div bg-primary p-1 rounded-pill">
                  {reactionIcons}
                  {message.reactions.length}
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className={classNames("py-2 px-3 rounded-pill position-relative", {
              "bg-primary": sent,
              "bg-secondary": received,
            })}
          >
            {message.reactions.length > 0 && (
              <div className="reactions-div bg-primary p-1 rounded-pill">
                {reactionIcons}
                {message.reactions.length}
              </div>
            )}
            <p className={classNames({ "text-white": sent })} key={message.id}>
              {message.content}
            </p>
          </div>
        )}
      </OverlayTrigger>
    </div>
  );
}
const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($id: String!, $content: String!) {
    reactToMessage(id: $id, content: $content) {
      content
      createdAt
      message {
        id
        content
        createdAt
        from
        to
      }
    }
  }
`;
