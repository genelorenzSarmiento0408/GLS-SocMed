import React, { useState, useContext, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";

import { AuthContext } from "../context/auth";
const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);

  const passwordInputRef = useRef(null);
  let username;
  if (user) username = user.username;
  const [editPass] = useMutation(EDIT_PASSWORD, {
    update() {
      setoldPassword("");
      setnewPassword("");
      passwordInputRef.current.blur();
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: username,
      password: oldPassword,
      newPassword: newPassword,
    },
  });
  return (
    <div>
      <Button
        variant="info"
        onClick={() => {
          setOpen(true);
        }}
      >
        Change Password
      </Button>

      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <b>Old Password</b>
              <br />
              <Form.Control
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={(event) => setoldPassword(event.target.value)}
                ref={passwordInputRef}
              />
              <br />
              <b>New Password</b>
              <br />
              <Form.Control
                type="text"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(event) => setnewPassword(event.target.value)}
                ref={passwordInputRef}
              />
            </Form>
            {Object.keys(errors).length > 0 && (
              <div className="alert alert-danger">
                <ul className="list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="info"
            disabled={oldPassword.trim() === "" && newPassword.trim() === ""}
            onClick={editPass}
          >
            Save Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EDIT_PASSWORD = gql`
  mutation EDIT_PASSWORD(
    $username: String!
    $password: String!
    $newPassword: String!
  ) {
    editpassword(
      username: $username
      password: $password
      newPassword: $newPassword
    ) {
      id
      username
    }
  }
`;

export default ChangePassword;
