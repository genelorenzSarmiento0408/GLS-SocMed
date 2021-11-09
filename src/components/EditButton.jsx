import React, { useState, useContext, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Card, Icon, Form, Modal, Header } from "semantic-ui-react";

import PopupGlobal from "../util/PopupGlobal";
import { AuthContext } from "../context/auth";

const EditButton = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [Title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const titleInputRef = useRef(null);
  let render;

  const [editTitle] = useMutation(EDIT_TITLE, {
    update() {
      setTitle("");
      titleInputRef.current.blur();
    },
    variables: {
      postId,
      newTitle: Title,
    },
  });
  render = (
    <Modal
      closeIcon
      open={open}
      trigger={
        <PopupGlobal content="Edit Post">
          <Button as="div" labelPosition="right">
            <Button floated="right" color="teal">
              <Icon name="edit" />
            </Button>
            {/* <Icon name="edit" /> */}
          </Button>
        </PopupGlobal>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {user && (
        <>
          <Header icon="edit" content="Edit Title" />
          <Form>
            <div className="ui action input fluid">
              <input
                type="text"
                placeholder="New Title"
                name="Comment"
                value={Title}
                onChange={(event) => setTitle(event.target.value)}
                ref={titleInputRef}
              />
              <button
                type="submit"
                className="ui button teal"
                disabled={Title.trim() === ""}
                onClick={editTitle}
              >
                Submit
              </button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );

  return render;
};

const EDIT_TITLE = gql`
  mutation EDIT_TITLE($postId: ID!, $newTitle: String!) {
    editTitle(postId: $postId, newTitle: $newTitle) {
      id
      username
    }
  }
`;

export default EditButton;
