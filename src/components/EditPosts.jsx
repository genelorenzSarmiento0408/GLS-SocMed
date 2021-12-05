import React, { useState, useContext, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Modal, Button } from "react-bootstrap";

import { AuthContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditPosts = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [Body, setBody] = useState("");
  const [Title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const PostInputRef = useRef(null);
  const TitleInputRef = useRef(null);
  const [editPost] = useMutation(EDIT_POST, {
    update() {
      setTitle("");
      setBody("");
      PostInputRef.current.blur();
    },
    variables: {
      postId,
      newBody: Body,
      newTitle: Title,
    },
  });
  let render;
  render = (
    <>
      <Button
        variant="info"
        onClick={() => {
          setOpen(true);
        }}
        className="float-end"
      >
        <FontAwesomeIcon icon={faPen} />
      </Button>

      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <>
              <Form>
                <b>Edit Title</b>
                <br />
                <input
                  type="text"
                  placeholder="New Title"
                  name="Title"
                  value={Title}
                  onChange={(event) => setTitle(event.target.value)}
                  ref={TitleInputRef}
                />
                <br />
                <b>Edit Body</b>
                <br />
                <input
                  type="text"
                  placeholder="New Body"
                  name="Body"
                  value={Body}
                  onChange={(event) => setBody(event.target.value)}
                  ref={PostInputRef}
                />
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="info"
            disabled={Body.trim() === "" && Title.trim() === ""}
            onClick={editPost}
          >
            Save Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  return render;
};

const EDIT_POST = gql`
  mutation EDIT_POST($postId: ID!, $newTitle: String, $newBody: String) {
    editPost(postId: $postId, newTitle: $newTitle, newBody: $newBody) {
      id
      title
      body
      username
      edited
      editedAt
    }
  }
`;

export default EditPosts;
