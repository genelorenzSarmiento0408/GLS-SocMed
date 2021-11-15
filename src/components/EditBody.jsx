import React, { useState, useContext, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Icon, Form, Modal, Header } from "semantic-ui-react";

import PopupGlobal from "../util/PopupGlobal";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const EditBody = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [Body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const BodyInputRef = useRef(null);
  let render;

  const [editBody] = useMutation(EDIT_BODY, {
    update(proxy, result) {
      setBody("");
      BodyInputRef.current.blur();
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.editBody, ...data.getPosts],
        },
      });
      console.log(result);
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
      trigger={
        <PopupGlobal content="Edit Body">
          <Icon name="edit" color="teal" />
        </PopupGlobal>
      }
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
