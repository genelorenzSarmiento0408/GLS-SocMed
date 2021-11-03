import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Card,
  Grid,
  Image,
  Icon,
  Button,
  Label,
  Form,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  console.log(id);
  const { user } = useContext(AuthContext);
  let userMarkup;
  const { loading, data: { getUser } = args } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
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
      id,
      title,
      body,
      createdAt,
      username,
      //   comments,
      //     likes,
      //     likeCount,
      //     commentCount,
    } = getUser;

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
                <Card.Meta>
                  {moment(createdAt).fromNow()} • by {username}
                </Card.Meta>
                <Card.Description>{"test biosa"}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {/* <LikeButton user={user} post={{ id, likes, likeCount }} />
                <PopupGlobal content="Comment on Post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("Commenty")}
                  >
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </PopupGlobal> */}

                {/* {user && user.username === username && (
                  <DeleteButton id={id} callback={deletePostCallbaxk} />
                )} */}
              </Card.Content>
            </Card>
            {/* {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a Comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="Comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )} */}
            {/* {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))} */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return userMarkup;
};

export const FETCH_USER_QUERY = gql`
  query ($id: ID!) {
    getUser(id: $id) {
      id
      username
      Bio
      role
    }
  }
`;
export default OtherProfile;
