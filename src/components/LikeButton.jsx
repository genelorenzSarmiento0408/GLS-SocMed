import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

import { GrLike } from "react-icons/gr";

import "../App.scss";
import PopupGlobal from "../util/PopupGlobal";

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
      <Button color="teal">
        <GrLike />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="thumbs up outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <GrLike />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <PopupGlobal content={liked ? "Unlike" : "Like"}>
        {likeButton}
      </PopupGlobal>

      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
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
