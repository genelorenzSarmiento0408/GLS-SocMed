import React from "react";
import { Row } from "react-bootstrap";

import Users from "../components/Users";
import Messages from "../pages/Messages";

export default function Home() {
  return (
    <>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </>
  );
}
