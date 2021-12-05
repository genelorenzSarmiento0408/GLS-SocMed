import React, { useContext, useState, useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Button, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

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
    let userMarkup = loading && <Spinner content="Loading Information..." />;
    return userMarkup;
  } else {
    const { Bio } = getUser;

    if (Bio != null) userBio = true;
    const pathname = window.location.pathname; //returns the current url minus the domain name

    const userReturn = (
      <>
        {userBio ? (
          <Button color="teal" onClick={() => setOpen(true)}>
            Edit Bio
          </Button>
        ) : (
          <Button color="teal" onClick={() => setOpen(true)}>
            Add Bio
          </Button>
        )}
        <p>{pathname === "/settings" && userBio && Bio}</p>
        <Modal show={open} onHide={() => setOpen(false)}>
          <Modal.Header>
            <Modal.Title>
              {userBio ? "Edit Bio" : "Add Bio"}
              <FontAwesomeIcon icon={userBio ? faUserEdit : faPlus} />
            </Modal.Title>
          </Modal.Header>

          <Form>
            <Form.Label className="h3">
              {userBio ? "Edit Bio" : "Add Bio"}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={userBio ? "Edit Bio" : "Add Bio"}
              name="Bio"
              value={newBio}
              onChange={(event) => setBio(event.target.value)}
              ref={BioInputRef}
            />
          </Form>

          <Modal.Footer>
            <Button variant="outline-danger" onClick={() => setOpen(false)}>
              Cancel
            </Button>{" "}
            <Button
              type="submit"
              className="ui button teal"
              disabled={newBio.trim() === ""}
              onClick={editandAddBio}
            >
              {userBio ? "Edit Bio" : "Add Bio"}
            </Button>
          </Modal.Footer>
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
