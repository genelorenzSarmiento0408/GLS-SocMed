import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition, Segment, Loader } from "semantic-ui-react";

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
    <Grid inverted columns={3}>
      <Grid.Row>
        {user ? (
          <Grid.Column width={16}>
            <PostForm style={{ background: "#1B1C1D" }} />{" "}
            <Segment inverted>
              <Grid.Row className="page-title" style={{ marginBottom: 20 }}>
                <h1>Recent Posts</h1>
              </Grid.Row>{" "}
            </Segment>
          </Grid.Column>
        ) : (
          <Grid.Column width={16}>
            <Segment inverted>
              <Grid.Row className="page-title" style={{ marginBottom: 20 }}>
                <h1>Recent Posts</h1>
              </Grid.Row>
            </Segment>
          </Grid.Column>
        )}

        {}
        {loading && <Loader content="Loading post..." />}
        {
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column
                  key={post.id}
                  style={{ marginBottom: 10 }}
                  width={16}
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
