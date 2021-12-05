import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Image, Button, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import EditOrAddBio from "../components/EditOrAddBio";

const UserProfile = (args = {}) => {
  const { user } = useContext(AuthContext);
  const username = user.username;

  let userMarkup;
  const { loading, data: { getUser } = args } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });

  if (!getUser) {
    userMarkup = loading && <Spinner content="Loading user..." />;
  } else {
    const { createdAt, username, Bio } = getUser;
    const datetostr = createdAt.substring(0, 10);

    userMarkup = (
      <>
        <Row>
          <Col width={1}>
            <Image
              src="/default-profile-pic.jpg"
              float="right"
              alt="image profile"
              width="150rem"
            />
          </Col>
          <Col width={10}>
            <Card bg="dark" style={{ width: "65rem" }}>
              <Card.Body>
                <Card.Title style={{ color: "white" }}>{username}</Card.Title>
                <Card.Subtitle
                  style={{ color: "white" }}
                >{`user created at: ${datetostr}`}</Card.Subtitle>
                <p style={{ color: "white" }}> {Bio}</p>
                <EditOrAddBio />
              </Card.Body>
              <hr />
              <Card.Body>
                <Button as={Link} to={"/settings"} color="teal">
                  Settings
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  return userMarkup;
};

const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    getUser(username: $username) {
      id
      username
      createdAt
      Bio
    }
  }
`;
export default UserProfile;
