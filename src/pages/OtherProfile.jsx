import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Card,
  Grid,
  Image,
  //   Icon,
  //   Button,
  //   Label,
  //   Form,
  Loader,
  Dimmer,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const OtherProfile = (props, args = {}) => {
  const username = props.match.params.username;
  // const { user } = useContext(AuthContext);
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
    const {
      //   id,
      //   title,
      Bio,
      createdAt,
      username,
      //   comments,
      //     likes,
      //     likeCount,
      //     commentCount,
    } = getUser;
    const datetostr = createdAt.substring(0, 10);
    if (Bio === null) {
      console.log("Bio none");
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
                  {isbionull ? "No Bio added" : Bio}{" "}
                </Card.Description>
              </Card.Content>
              <hr />{" "}
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
export default OtherProfile;
