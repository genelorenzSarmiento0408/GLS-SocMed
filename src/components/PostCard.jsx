import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import "../App.scss";
import DeleteButton from "./DeleteButton";
import PopupGlobal from "../util/PopupGlobal";
import EditButton from "./EditButton";

export default function PostCard({
  post: {
    title,
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    edited,
    editedAt,
  },
}) {
  console.log(edited, editedAt);
  const { user } = useContext(AuthContext);

  return (
    <Grid>
      <Grid.Column width={12} className="ui centered card">
        <Card.Content>
          <Image
            floated="left"
            size="large"
            src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
            avatar
          />
          <PopupGlobal
            content={
              <Image
                floated="left"
                size="mini"
                src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
                avatar
              />
            }
            header={username}
          >
            <Card.Meta as={Link} to={`/users/${username}`}>
              {moment(createdAt).fromNow(true)} ago • by {username}{" "}
              {edited ? `Edited At: ${editedAt}` : ""}
            </Card.Meta>
          </PopupGlobal>
          {/* <Card.Header as={Link} to={`/posts/${id}`}>
              {title}
            </Card.Header> */}
          {user && user.username === username && <EditButton postId={id} />}

          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <PopupGlobal content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="red" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="red" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </PopupGlobal>

          {user && user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Grid.Column>
    </Grid>
  );
}
