import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({ postId, callback, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update() {
      setConfirmOpen(false);
      if (!commentId) {
        window.location.reload(false);
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      {/* <PopupGlobal content={commentId ? "Delete comment" : "Delete post"}> */}
      <Button
        as="div"
        className="float-end"
        variant="danger"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Modal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {commentId ? "comment" : "post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're deleting this post Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePostOrMutation}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* </PopupGlobal> */}
      {/* 
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      /> */}
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
