import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Grid, Image, Loader, Dimmer, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import EditOrAddBio from "../components/EditOrAddBio";

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
    userMarkup = loading && (
      <Dimmer active>
        <Loader content="Loading user..." />
      </Dimmer>
    );
  } else {
    console.log(getUser);
    let userBio;
    const { Bio, createdAt, username } = getUser;
    const datetostr = createdAt.substring(0, 10);
    if (Bio != null) {
      userBio = true;
    }

    userMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
              size="small"
              float="right"
              alt="image profile "
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{`user created at: ${datetostr}`}</Card.Meta>
                <Card.Description>
                  {user && user.username === username && <EditOrAddBio />}
                </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {user && user.username === username && (
                  <Button as={Link} to={"/settings"} color="teal">
                    Settings
                  </Button>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
