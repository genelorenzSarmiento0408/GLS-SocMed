import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Row, Image, Spinner, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import EditOrAddBio from "../components/EditOrAddBio";
import UserProfile from "./UserProfile";

const Profile = (props, args = {}) => {
  const username = props.match.params.username;
  const { user } = useContext(AuthContext);

  let userMarkup;
  const { loading, data: { getUser } = args } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });

  if (!getUser) {
    userMarkup = loading && <Spinner content="Loading user..." />;
  } else {
    let userBio;
    const { Bio, createdAt, username } = getUser;
    const datetostr = createdAt.substring(0, 10);
    if (Bio != null) {
      userBio = true;
    }
    if (user.username === username) {
      userMarkup = <UserProfile />;
      return userMarkup;
    }
    console.info(`${user.username} + ${username}`);
    userMarkup = (
      <>
        <Row>
          <Col width={1}>
            <Image
              src="/default-profile-pic.jpg"
              float="right"
              alt="image profile"
              width="200.5rem"
            />
          </Col>
          <Col width={2}>
            <Card bg="dark" style={{ width: "65rem" }}>
              <Card.Body>
                <Card.Title style={{ color: "white" }}>{username}</Card.Title>
                <Card.Subtitle
                  style={{ color: "white" }}
                >{`user created at: ${datetostr}`}</Card.Subtitle>
                <Card.Body style={{ color: "white" }}>
                  {username && userBio ? Bio : "No Bio found"}
                  {user && user.username === username && <EditOrAddBio />}
                </Card.Body>
              </Card.Body>
              <hr />
              <Card.Body extra>
                {user && user.username === username && (
                  <Button as={Link} to={"/settings"} color="teal">
                    Settings
                  </Button>
                )}
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
export default Profile;
