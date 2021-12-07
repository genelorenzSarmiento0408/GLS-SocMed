import React, { useState } from "react";
import { Button, Form, Col, Container } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function PostForm() {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.title = "";
      values.body = "";
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div className="text-light bg-dark">
      <Container fluid="xl">
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="Form.Post">
              <h1 style={{ textAlign: "center" }}>Create Post</h1>
              <Form.Label>Title</Form.Label>
              <Form.Control
                label="Title"
                placaholder="Title"
                name="title"
                onChange={onChange}
                value={values.title}
                type="text"
              />
              <Form.Label>Body</Form.Label>
              <Form.Control
                label="Body"
                placaholder="Body"
                name="body"
                onChange={onChange}
                type="text"
                as="textarea"
                value={values.body}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </Col>
      </Container>
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      edited
      editedAt
      profileUrl
    }
  }
`;
