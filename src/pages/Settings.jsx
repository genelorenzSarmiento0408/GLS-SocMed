import React, { useContext, useState, useRef } from "react";
import { Col, Card, Form, Button, Modal } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";

import { AuthContext } from "../context/auth";
// import EditOrAddBio from "../components/EditOrAddBio";

export const Settings = () => {
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

  let userSettings = (
    <>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "50rem" }} className="bg-dark text-white">
          <div className="h1 text-center">Settings</div>
          <div className="h4">Username: {username}</div>
          <div className="h3">Change Password</div>
          <Card.Body>
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
                  disabled={
                    oldPassword.trim() === "" && newPassword.trim() === ""
                  }
                  onClick={editPass}
                >
                  Save Post
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>{" "}
      </Col>
    </>

    // <Grid>
    //   <Grid.Column
    //     style={{ background: "#1B1C1D" }}
    //     className="ui centered card"
    //     width={12}
    //   >
    //     <div className="page-title">
    //       <h1>Settings</h1>
    //     </div>

    //     <Form>
    //       <div className="ui action fluid">
    //

    //       </div>
    //     </Form>
    //     {Object.keys(errors).length > 0 && (
    //       <div className="ui error message">
    //         <ul className="list">
    //           {Object.values(errors).map((value) => (
    //             <li key={value}>{value}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}
    //     <Form>
    //       <Divider />
    //       <h2>Edit Bio</h2>
    //       <EditOrAddBio />
    //     </Form>
    //   </Grid.Column>
    // </Grid>
  );
  return userSettings;
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
