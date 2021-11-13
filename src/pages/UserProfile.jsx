import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Grid, Image, Loader, Dimmer, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

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
    userMarkup = loading && (
      <Dimmer active>
        <Loader content="Loading user..." />
      </Dimmer>
    );
  } else {
    let isbionull = false;
    const { Bio, createdAt, username } = getUser;
    const datetostr = createdAt.substring(0, 10);
    if (Bio === null) {
      isbionull = true;
    }

    userMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{`user created at: ${datetostr}`}</Card.Meta>
                <Card.Description>
                  {isbionull ? "No Bio added" : Bio}
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <Button as={Link} to={"/settings"} color="facebook">
                  Settings
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return userMarkup;
  if (!user)
    return (
      <>
        <h1>lol</h1>
      </>
    );
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
