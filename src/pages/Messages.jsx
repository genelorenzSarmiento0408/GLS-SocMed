import React, { useEffect, useState, Fragment } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { useMessageState, useMessageDispatch } from "../context/message";
import Message from "../components/Message";
const Messages = () => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();
  const [content, setContent] = useState("");

  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) =>
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: selectedUser.username,
          message: data.sendMessage,
        },
      }),
    onError: (err) => console.error(err),
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    } // eslint-disable-next-line
  }, [dispatch, messagesData]);

  const submitMessage = (e) => {
    e.preventDefault();

    if (content.trim() === "" || !selectedUser) return;

    setContent("");

    // mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } });
  };
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.error(err),
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadFile({ variables: { file, to: selectedUser.username } });
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className="info-text">Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p className="info-text">Loading..</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
      <Fragment key={message.id}>
        <Message message={message} />

        {index === messages.length - 1 && (
          <div className="invisible">
            <hr className="m-0" />
          </div>
        )}
      </Fragment>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = (
      <p className="info-text">
        You are now connected! send your first message!
      </p>
    );
  }

  return (
    <Col xs={10} md={8} className="p-0">
      <div className="messages-box d-flex flex-column-reverse">
        {selectedChatMarkup}
      </div>
      <div className="px-3 py-2">
        <Form onSubmit={submitMessage}>
          <Form.Group className="d-flex align-items-center m-0">
            <Form.Control
              type="file"
              id="formFile"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Form.Control
              type="text"
              className="message-input rounded-pill p-3 bg-secondary border-0"
              placeholder="Type a message.."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="2x"
              className="text-secondary ml-2"
              onClick={submitMessage}
              role="button"
            ></FontAwesomeIcon>
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
};

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      id
      from
      to
      content
      createdAt
      reactions {
        content
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      from
      to
      content
      createdAt
      reactions {
        content
      }
    }
  }
`;
const UPLOAD_FILE = gql`
  mutation sendMessageUpload($file: Upload!, $to: String!) {
    sendMessageUpload(file: $file, to: $to) {
      id
      from
      to
    }
  }
`;

export default Messages;
