import React, { useContext } from "react";
import { Form, Card, Grid, Divider } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export const Settings = () => {
  const { user } = useContext(AuthContext);
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
              </div>
            </Form>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
