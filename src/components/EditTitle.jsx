import React, { useState, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Icon, Form, Modal, Header } from "semantic-ui-react";

const EditButton = ({ postId }) => {
  const [Title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const titleInputRef = useRef(null);
  let render;

  const [editTitle] = useMutation(EDIT_TITLE, {
    update() {
      setTitle("");
      titleInputRef.current.blur();
      window.location.reload(false);
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
      trigger={<Icon name="edit" color="teal" />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
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
