import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Spinner, Row, Col } from "react-bootstrap";

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
    // <Grid inverted columns={3}>
    //   <Grid.Row>
    <>
      {user ? (
        <Col width={16}>
          <PostForm style={{ background: "#1B1C1D" }} />
          <Row
            className="page-title"
            style={{ marginBottom: 20, color: "white" }}
          >
            <h1>Recent Posts</h1>
          </Row>{" "}
        </Col>
      ) : (
        <Col width={16}>
          <Row
            className="page-title"
            style={{ marginBottom: 20, color: "white" }}
          >
            <h1>Recent Posts</h1>
          </Row>{" "}
        </Col>
      )}

      {}
      {loading && <Spinner content="Loading post..." />}
      {
        // <Transition.Group>
        <>
          {posts &&
            posts.map((post) => (
              <Col key={post.id} style={{ marginBottom: 10 }} width={16}>
                <PostCard post={post} />
              </Col>
            ))}
        </>
      }
      {/* </Grid.Row>
    </Grid> */}
    </>
  );
}
