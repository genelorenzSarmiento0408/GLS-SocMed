import React, { useContext, useState, useRef } from "react";
import { Form, Card, Grid, Divider } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setoldPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");

  const passwordInputRef = useRef(null);
  let username = user.username;
  return (
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
                  type="text"
                  placeholder="Username"
                  name="Comment"
                  value={oldPassword}
                  onChange={(event) => setoldPassword(event.target.value)}
                  ref={passwordInputRef}
                />
              </div>
            </Form>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
