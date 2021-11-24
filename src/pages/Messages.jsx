import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Col, Row } from "react-bootstrap";

const Messages = () => {
  const { loading, data, error } = useQuery(GET_USERS);
  let usersMarkup;
  if (data) {
    console.log(data);
  }
  console.log(error);
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <p>{user.username}</p>
      </div>
    ));
  }
  return (
    <Fragment>
      <Row className="bg-white">
        <Col xs={4}>{usersMarkup}</Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
    </Fragment>
  );
};
const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`;
export default Messages;
