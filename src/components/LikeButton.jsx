import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "../App.scss";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      return err;
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button onClick={likePost}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <Badge bg="light">{likeCount}</Badge>
      </Button>
    ) : (
      <Button variant="outline-primary" onClick={likePost}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <Badge bg="light">{likeCount}</Badge>
      </Button>
    )
  ) : (
    <Button variant="outline-primary" as={Link} to="/login">
      <FontAwesomeIcon icon={faThumbsUp} />{" "}
      <Badge bg="light">{likeCount}</Badge>
    </Button>
  );

  return (
    // <Button variant="outline-primary" as="div" onClick={likePost}>
    <>{likeButton}</>
    // </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
