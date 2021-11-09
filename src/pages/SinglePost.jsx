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
  Comment,
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import PopupGlobal from "../util/PopupGlobal";

function SinglePost(props, args = {}) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { loading, data: { getPost } = args } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallbaxk() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = loading && (
      <Dimmer active>
        <Loader content="Loading post..." />
      </Dimmer>
    );
  } else {
    const {
      id,
      title,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
      edited,
      editedAt,
    } = getPost;
    let dateofedit = editedAt.split("T");
    postMarkup = (
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
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                  {moment(createdAt).fromNow()} • by {username}
                  {edited ? editedAt : ""}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {edited ? `Edited At ${dateofedit}` : ""}
                <br />
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <PopupGlobal content="Comment on Post">
                  <Button as="div" labelPosition="right">
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </PopupGlobal>

                {user && user.username === username && (
                  <>
                    <DeleteButton postId={id} callback={deletePostCallbaxk} />
                  </>
                )}
              </Card.Content>
            </Card>
            {user && (
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
            )}
            {comments.map((comment) => (
              <Comment.Group key={comment.id}>
                <Card fluid>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Content>
                    <Comment>
                      <Comment.Avatar src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg" />
                      <Comment.Author>{comment.username}</Comment.Author>
                      <Comment.Metadata>
                        {moment(comment.createdAt).fromNow()}
                      </Comment.Metadata>
                      <Comment.Text>{comment.body}</Comment.Text>{" "}
                    </Comment>{" "}
                  </Card.Content>
                </Card>
              </Comment.Group>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      editedAt
      edited
    }
  }
`;
export default SinglePost;
