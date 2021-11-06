import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import PostForm from "../components/PostForm.jsx";
import "../App.scss";

export default function Home() {
  const { user } = useContext(AuthContext);
  const FETCH_ALL = () => {
    const FETCH_POSTS = useQuery(FETCH_POSTS_QUERY);

    return [FETCH_POSTS];
  };
  const [{ loading, data: { getPosts: posts } = {} }] = FETCH_ALL();
  return (
    <Grid columns={3}>
      <Grid.Row>
        {user && (
          <Grid.Column width={11}>
            <PostForm />{" "}
            <Grid.Row
              className="page-title"
              style={{ marginBottom: 20 }}
            ></Grid.Row>
          </Grid.Column>
        )}{" "}
        <h1>Recent Posts</h1>
        {loading && <h1>Loading posts...</h1>}
        {
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column
                  key={post.id}
                  style={{ marginBottom: 10 }}
                  width={11}
                >
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        }
      </Grid.Row>
    </Grid>
  );
}
