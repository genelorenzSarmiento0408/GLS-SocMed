import React, { useContext, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Button, Loader, Modal, Header, Form } from "semantic-ui-react";

// import PopupGlobal from "../util/PopupGlobal";
import { AuthContext } from "../context/auth";

const EditOrAddBio = (args = {}) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [newBio, setBio] = useState("");

  const BioInputRef = useRef(null);

  let username = user.username;
  let userBio;

  const [editandAddBio] = useMutation(EDITORADDBIO, {
    update() {
      setBio("");
      BioInputRef.current.blur();
      window.location.reload(false);
    },
    variables: {
      username: username,
      newBio: newBio,
    },
  });

  const { loading, data: { getUser } = args } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });

  if (!getUser) {
    let userMarkup = loading && <Loader content="Loading Information..." />;
    return userMarkup;
  } else {
    const { Bio } = getUser;

    if (Bio != null) userBio = true;

    const userReturn = (
      <>
        <p>{userBio ? Bio : "No Bio added"}</p>
        <Modal
          closeIcon
          open={open}
          trigger={
            userBio ? (
              <Button color="teal">Edit Bio</Button>
            ) : (
              <Button color="teal">Add Bio</Button>
            )
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          {user && (
            <>
              <Header icon="edit" content={userBio ? "Edit Bio" : "Add Bio"} />
              <Form>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder={userBio ? "Edit Bio" : "Add Bio"}
                    name="Comment"
                    value={newBio}
                    onChange={(event) => setBio(event.target.value)}
                    ref={BioInputRef}
                  />
                  <button
                    type="submit"
                    className="ui button teal"
                    disabled={newBio.trim() === ""}
                    onClick={editandAddBio}
                  >
                    {userBio ? "Edit Bio" : "Add Bio"}
                  </button>
                </div>
              </Form>
            </>
          )}

          <Modal.Actions>
            <Button color="red" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );

    return userReturn;
  }
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!) {
    editBio(username: $username, newBio: $newBio) {
      id
      username
    }
  }
`;

const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    getUser(username: $username) {
      id
      createdAt
      Bio
      email
      username
    }
  }
`;

export default EditOrAddBio;
