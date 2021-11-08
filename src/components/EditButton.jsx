import React from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

import PopupGlobal from "../util/PopupGlobal";

const EditButton = (props, args = {}) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Card fluid>
          <Card.Content>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Edit Title"
                  name="Comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  ref={commentInputRef}
                />
                <button
                  type="submit"
                  className="ui button teal"
                  disabled={comment.trim() === ""}
                  onClick={submitComment}
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
  mutation ($editTitle: String!) {
    editTitle(editTitle: $editTitle) {
      postId
      username
    }
  }
`;

export default EditButton;
