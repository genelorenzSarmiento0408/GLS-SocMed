import React, { useState, useContext, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Card, Icon, Form, Modal, Header } from "semantic-ui-react";

import PopupGlobal from "../util/PopupGlobal";
import { AuthContext } from "../context/auth";

const EditButton = (/*props, args = {},*/ { postId }) => {
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
      body: Title,
    },
  });
  render = (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button as="div" labelPosition="right">
          <PopupGlobal content="Edit Post">
            <Icon name="edit" />
          </PopupGlobal>
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {user && (
        <Card fluid>
          <Card.Content>
            <Header icon="edit" content="Edit Title" />
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Edit Title"
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
          </Card.Content>
        </Card>
      )}
    </Modal>
  );

  return render;
};

const EDIT_TITLE = gql`
  mutation ($postId: String!, $newTitle: String!) {
    editTitle(postId: $postId, newTitle: $newTitle) {
      id
      username
    }
  }
`;

export default EditButton;
