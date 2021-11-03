import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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
import moment from "moment";

import { AuthContext } from "../context/auth";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  //   console.log(id);
  const { user } = useContext(AuthContext);
  let userMarkup;
  const { loading, data: { getUser } = args } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
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
    const {
      //   id,
      //   title,
      //   body,
      createdAt,
      username,
      //   comments,
      //     likes,
      //     likeCount,
      //     commentCount,
    } = getUser;

    const userMarkup = (
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
                <Card.Meta>
                  {moment(createdAt).fromNow()} • by {username}
                </Card.Meta>
                <Card.Description>{"test biosa"}</Card.Description>
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
  query ($id: ID!) {
    getUser(id: $id) {
      id
      username
      createdAt
    }
  }
`;
export default OtherProfile;
