import React, { useContext, useState } from "react";
import { Form, Button, Col, Container, Spinner } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }
  if (loading) {
    return <Spinner animation="border" role="status" />;
  }
  return (
    <div className="form-container mb-3 text-light bg-dark">
      <Container>
        <Col>
          <Form onSubmit={onSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                label="Username"
                placeholder="Username.."
                name="username"
                type="text"
                value={values.username}
                onChange={onChange}
                required
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
