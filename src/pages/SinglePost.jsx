import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card, Image, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import EditPosts from "../components/EditPosts";

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
  let dateofedit;
  let postMarkup;
  if (!getPost) {
    postMarkup = loading && <Spinner content="Loading post..." />;
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
      dateofedit = editedAt.split("T")[0];
    }
    postMarkup = (
      <>
        <Row>
          <Col width={10}>
            <Card bg="dark">
              <Card.Body>
                <Card.Title style={{ color: "white" }}>
                  <Image
                    src={"/default-profile-pic.jpg"}
                    roundedCircle
                    className="mr-2"
                    style={{ width: 40, height: 40, objectFit: "cover" }}
                    alt="Profile picture of user"
                  />
                  {` ${username}`}
                </Card.Title>
                <Card.Subtitle style={{ color: "#9B9D9E" }}>
                  {moment(createdAt).fromNow()}
                  {edited ? ` • Edited` : ""}
                </Card.Subtitle>
                <Card.Body style={{ color: "white" }}>
                  <h2>{title}</h2>
                  <Card.Text>{body}</Card.Text>
                </Card.Body>{" "}
              </Card.Body>

              <br />
              <Card.Body>
                {edited ? (
                  <p style={{ color: "white" }}>Edited At {dateofedit}</p>
                ) : (
                  ""
                )}
                {user && user.username === username && (
                  <EditPosts postId={id} />
                )}
                <LikeButton user={user} post={{ id, likes, likeCount }} />

                <Button as="div" variant="danger">
                  <FontAwesomeIcon icon={faComments} />

                  {commentCount}
                </Button>

                {user && user.username === username && (
                  <>
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  </>
                )}
              </Card.Body>
            </Card>

            {user && (
              <Card bg="dark">
                <Card.Body>
                  <p style={{ color: "white" }}>Post a Comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <Form.Control
                        type="text"
                        placeholder="Comment..."
                        name="Comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <Button
                        type="submit"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}
            {/* --------------COMMENTS---------*/}
            {comments.map((comment) => (
              <Card bg="dark" key={comment.id}>
                <Card.Body>
                  <Card.Title style={{ color: "white" }}>
                    <Image
                      src={"/default-profile-pic.jpg"}
                      roundedCircle
                      className="mr-2"
                      style={{ width: 40, height: 40, objectFit: "cover" }}
                      alt="Profile picture of user"
                    />
                    {comment.username}
                  </Card.Title>
                  <Card.Subtitle style={{ color: "white" }}>
                    {moment(comment.createdAt).fromNow()}
                  </Card.Subtitle>
                  <Card.Body style={{ color: "white" }}>
                    {comment.body}
                  </Card.Body>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </>
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
