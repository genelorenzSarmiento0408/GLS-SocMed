import React, { useState, useContext, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Icon, Form, Modal, Header } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const EditBody = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [Body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const BodyInputRef = useRef(null);
  let render;

  const [editBody] = useMutation(EDIT_BODY, {
    update() {
      setBody("");
      BodyInputRef.current.blur();
      window.location.reload(false);
    },
    variables: {
      postId,
      newBody: Body,
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
      {user && (
        <>
          <Header icon="edit" content="Edit Body" />
          <Form>
            <div className="ui action input fluid">
              <input
                type="text"
                placeholder="New Body"
                name="Comment"
                value={Body}
                onChange={(event) => setBody(event.target.value)}
                ref={BodyInputRef}
              />
              <button
                type="submit"
                className="ui button teal"
                disabled={Body.trim() === ""}
                onClick={editBody}
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

const EDIT_BODY = gql`
  mutation EDIT_BODY($postId: ID!, $newBody: String!) {
    editBody(postId: $postId, newBody: $newBody) {
      id
      username
    }
  }
`;

export default EditBody;
