import React from "react";
import { Col, Card } from "react-bootstrap";

import { useAuthState } from "../context/auth";
import ChangePassword from "../components/ChangePassword";
import ChangeProfilePic from "../components/ChangeProfilePic";
import EditEmail from "../components/EditEmail";

export const Settings = () => {
  const { user } = useAuthState();

  let username;
  if (user) username = user.username;

  let userSettings = (
    <>
      <Col className="d-flex justify-content-center">
        <Card style={{ width: "50rem" }} className="bg-dark text-white">
          <div className="h1 text-center">Settings</div>
          <div className="h4">Username: {username}</div>
          <div className="h3">Change Password</div>
          <Card.Body>
            <ChangePassword />
            <ChangeProfilePic />
            <EditEmail />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
  return userSettings;
};
