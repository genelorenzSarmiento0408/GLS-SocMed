import React, { useContext } from "react";
// eslint-disable-next-line
// import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";
import { Card, Button, Badge, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import "../App.scss";
import DeleteButton from "./DeleteButton";
import EditPosts from "./EditPosts";

export default function PostCard({
  post: {
    title,
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    profileUrl,
    likes,
    edited,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Col width={11}>
      <Card bg="dark" text="white" className="mb-2">
        <Card.Body>
          <a href={`/users/${username}`} className="custom-card">
            <Card.Title>
              <Image
                src={profileUrl ? profileUrl : "/default-profile-pic.jpg"}
                roundedCircle
                className="mr-2"
                style={{ width: 40, height: 40, objectFit: "cover" }}
                alt="Profile picture of user"
              />
              {` ${username}`}
            </Card.Title>{" "}
          </a>
          <a href={`/posts/${id}`} className="custom-card">
            <Card.Subtitle className="mb-2" style={{ color: "#9B9D9E" }}>
              {moment(createdAt).fromNow()}
              {edited ? ` • Edited` : ""}
            </Card.Subtitle>
            <h2>{title}</h2>
            <Card.Text>{body}</Card.Text>
          </a>
          {user && user.username === username && <EditPosts postId={id} />}
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Button
            placement="right"
            as={Link}
            to={`/posts/${id}`}
            variant="danger"
          >
            <FontAwesomeIcon icon={faComments} />
            <Badge> {commentCount}</Badge>
          </Button>
          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Body>
      </Card>
    </Col>
  );
}
