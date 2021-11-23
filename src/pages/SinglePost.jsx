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
  Comment,
  Segment,
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import PopupGlobal from "../util/PopupGlobal";
import EditButton from "../components/EditTitle";
import EditBody from "../components/EditBody";

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

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = loading && <Loader content="Loading post..." />;
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
    if (edited) {
      var dateofedit = editedAt.split("T")[0];
    }
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
            <Segment inverted>
              <Card fluid>
                <Card.Content>
                  <Card.Header style={{ color: "white" }}>
                    {username}
                  </Card.Header>
                  <Card.Meta style={{ color: "white" }}>
                    {moment(createdAt).fromNow()}
                    {edited ? `• Edited` : ""}
                  </Card.Meta>
                  <Card.Description style={{ color: "white" }}>
                    <h2>
                      {title}
                      {user && user.username === username && (
                        <EditButton postId={id} />
                      )}
                    </h2>
                    <p>
                      {body}
                      {user && user.username === username && (
                        <EditBody postId={id} />
                      )}
                    </p>
                  </Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  {edited ? (
                    <p style={{ color: "white" }}>Edited At {dateofedit}</p>
                  ) : (
                    ""
                  )}

                  <LikeButton user={user} post={{ id, likes, likeCount }} />
                  <PopupGlobal content="Comment on Post">
                    <Button as="div" labelPosition="right">
                      <Button color="red" basic>
                        <Icon name="comments" />
                      </Button>
                      <Label color="red" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </PopupGlobal>

                  {user && user.username === username && (
                    <>
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    </>
                  )}
                </Card.Content>
              </Card>
            </Segment>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p style={{ color: "white" }}>Post a Comment</p>
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
                      <Comment.Author style={{ color: "white" }}>
                        {comment.username}
                      </Comment.Author>
                      <Comment.Metadata style={{ color: "white" }}>
                        {moment(comment.createdAt).fromNow()}
                      </Comment.Metadata>
                      <Comment.Text style={{ color: "white" }}>
                        {comment.body}
                      </Comment.Text>{" "}
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
