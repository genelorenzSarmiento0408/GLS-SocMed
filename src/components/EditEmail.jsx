import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";
import { useAuthState } from "../context/auth";
export default function EditEmail() {
  const { user } = useAuthState();
  const [newEmail, setnewEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [editEmail] = useMutation(EDIT_EMAIL, {
    update() {
      setnewEmail("");
      emailInputRef.current.blur();
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: user.username,
      newEmail: newEmail,
    },
  });
  const emailInputRef = useRef(null);
  return (
    <div>
      <h5>New Email</h5>
      <br />
      <Form.Control
        type="email"
        placeholder="New Email"
        value={newEmail}
        onChange={(event) => setnewEmail(event.target.value)}
        ref={emailInputRef}
      />
      <Button
        type="submit"
        variant="info"
        disabled={newEmail.trim() === ""}
        onClick={editEmail}
      >
        Edit Email
      </Button>

      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
const EDIT_EMAIL = gql`
  mutation EDIT_EMAIL($username: String!, $newEmail: String!) {
    editEmail(username: $username, newEmail: $newEmail) {
      id
      username
    }
  }
`;
