import React, { useEffect, useState, Fragment } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Grid, Image } from "semantic-ui-react";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, data, error } = useQuery(GET_USERS);
  const [getMessages, { data: messagesData }] = useLazyQuery(GET_MESSAGES);
  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  if (error) {
    return error;
    // debug console
  }
  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        style={{ padding: "1rem" }}
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          floated="left"
          size="mini"
          src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
          alt="default pfp"
          avatar
        />
        <p style={{ color: "#00b5ad" }}>{user.username}</p>
        <p>{user.latestMessage ? user.latestMessage.content : ""}</p>
      </div>
    ));
  }
  return (
    <Fragment>
      <Grid columns={4}>
        <Grid.Row className="ui centered" style={{ color: "white" }}>
          <Grid.Column>Messages</Grid.Column>
          <Grid.Column className="bg-gray-black">{usersMarkup}</Grid.Column>
          <Grid.Column>
            {messagesData && messagesData.getMessages.length > 0 ? (
              messagesData.getMessages.map((message) => (
                <p key={message.id}>{message.content}</p>
              ))
            ) : (
              <p>Messages</p>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};
const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      latestMessage {
        id
        from
        to
        content
        createdAt
      }
    }
  }
`;
const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      id
      from
      to
      content
      createdAt
    }
  }
`;
export default Messages;
