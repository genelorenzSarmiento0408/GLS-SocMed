import React, { useEffect, useState, Fragment } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Row, Col, Image } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, data, error } = useQuery(GET_USERS);

  const [getMessages, { data: messagesData }] = useLazyQuery(GET_MESSAGES);
  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  if (error) {
    return error;
  }
  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        role="button"
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.ProfileUrl ? user.ProfileUrl : "/default-profile-pic.jpg"}
          roundedCircle
          className="mr-2"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div>
          <p className="text-success">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }
  return (
    <Fragment>
      <Row className="bg-white">
        <Col xs={4} className="p-0 bg-secondary">
          {usersMarkup}
        </Col>
        <Col xs={8}>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>Messages</p>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};
const GET_USERS = gql`
  query getUsers {
    getUsers {
      ProfileUrl
      username
      latestMessage {
        id
        from
        to
        content
        createdAt
      }
    }
  }
`;
const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      id
      from
      to
      content
      createdAt
    }
  }
`;
export default Messages;
