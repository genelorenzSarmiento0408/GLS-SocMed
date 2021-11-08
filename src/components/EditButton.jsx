import React, { useState, useContext, useRef } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Button, Card, Icon, Form } from "semantic-ui-react";

import PopupGlobal from "../util/PopupGlobal";
import { AuthContext } from "../context/auth";

const EditButton = (props, args = {}, postId) => {
  //   const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [Title, setTitle] = useState("");
  const titleInputRef = useRef(null);
  console.log(postId);
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

  return (
    <>
      <Button as="div" labelPosition="right">
        <PopupGlobal content="Edit Post">
          <Icon name="edit" />
        </PopupGlobal>
      </Button>
      {user && (
        <Card fluid>
          <Card.Content>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Edit Title"
                  name="Comment"
                  value={Title}
                  // onChange={(event) => setTitle(event.target.value)}
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
    </>
  );
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
