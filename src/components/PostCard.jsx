import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import "../App.scss";
import DeleteButton from "./DeleteButton";
import PopupGlobal from "../util/PopupGlobal";
import EditButton from "./EditTitle";
import EditBody from "./EditBody";

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
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Grid>
      <Grid.Column width={16} className="ui centered card">
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
                alt="It seems like it is a profile pic"
              />
            }
            header={username}
          >
            <Card.Header as={Link} to={`/users/${username}`}>
              {username}
            </Card.Header>
          </PopupGlobal>

          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow()}
            {edited ? `• Edited` : ""}
          </Card.Meta>

          <Card.Description>
            <h3>
              {title}
              {user && user.username === username && <EditButton postId={id} />}
            </h3>
            <p>
              {body}
              {user && user.username === username && <EditBody postId={id} />}
            </p>
          </Card.Description>
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
