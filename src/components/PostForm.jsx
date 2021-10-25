import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
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
      console.log(result);
      values.title = "";
      values.body = "";
    },
    onError(err) {
      return err;
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Grid mobile={16} tablet={8} computer={4}>
        <Grid.Column width={15} className="ui centered card">
          <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
              <Form.Input
                placaholder="Hi World"
                name="title"
                onChange={onChange}
                value={values.title}
                error={error ? true : false}
              />
              <Form.Input
                placaholder="Hi World"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button type="submit" color="teal">
                Post
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </>
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
    }
  }
`;
