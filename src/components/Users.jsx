import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import classNames from "classnames";

import { useMessageDispatch, useMessageState } from "../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      ProfileUrl
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

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      let picvalidator =
        /([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(?:jpg|gif|png|jfif|jpeg)?$/i;
      let validator;
      if (user.latestMessage) {
        validator = picvalidator.test(user.latestMessage.content);
      }

      return (
        <div
          role="button"
          className={classNames(
            "messages d-flex justify-content-center justify-content-md-start p-3",
            {
              "bg-white": selected,
            },
          )}
          key={user.username}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
        >
          <Image
            src={user.ProfileUrl ? user.ProfileUrl : "/default-profile-pic.jpg"}
            className="user-image"
          />
          <div className="d-none d-md-block ml-2">
            <p className="text-success">{user.username}</p>
            <p className="font-weight-light">
              {user.latestMessage
                ? user.latestMessage.content && validator
                  ? `${user.username} sent a photo`
                  : user.latestMessage.content
                : "You are now connected!"}
            </p>
          </div>
        </div>
      );
    });
  }
  return (
    <Col xs={2} md={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
