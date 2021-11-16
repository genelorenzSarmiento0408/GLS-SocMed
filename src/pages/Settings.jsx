import React, { useContext, useState, useRef } from "react";
import { Form, Card, Grid, Divider } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

import { AuthContext } from "../context/auth";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const passwordInputRef = useRef(null);
  let username;
  if (user) username = user.username;
  const [editPass] = useMutation(EDIT_PASSWORD, {
    update() {
      setoldPassword("");
      setnewPassword("");
      passwordInputRef.current.blur();
    },
    variables: {
      username: username,
      password: oldPassword,
      newPassword: newPassword,
    },
  });
  let a: String;

  let userSettings = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          <Card fluid>
            <div className="page-title">
              <h1>Settings</h1>
            </div>
            <Form>
              <div className="ui action fluid">
                <h3>Username:</h3>
                <input
                  type="text"
                  placeholder="Username"
                  name="Comment"
                  value={username}
                  readOnly
                />
                <br />
                <h2>Change Password</h2>
                <Divider />
                Old Password:
                <input
                  type="password"
                  placeholder="New Password"
                  name="Comment"
                  value={oldPassword}
                  onChange={(event) => setoldPassword(event.target.value)}
                  ref={passwordInputRef}
                />
                New Password:
                <input
                  type="password"
                  placeholder="New Password"
                  name="Comment"
                  value={newPassword}
                  onChange={(event) => setnewPassword(event.target.value)}
                  ref={passwordInputRef}
                />
                <button
                  type="submit"
                  className="ui button teal"
                  disabled={
                    (oldPassword.trim() === "", newPassword.trim() === "")
                  }
                  onClick={editPass}
                >
                  Change Password
                </button>
              </div>
            </Form>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
