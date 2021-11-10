import React, { useContext } from "react";
import { Form, Card, Grid } from "semantic-ui-react";

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
              <Form>
                <h3>Username:</h3>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Username"
                    name="Comment"
                    value={username}
                    // onChange={(event) => setComment(event.target.value)}
                    // ref={commentInputRef}
                  />
                </div>
              </Form>
            </div>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
