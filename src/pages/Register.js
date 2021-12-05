import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      console.log(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <div style={{ color: "white" }} className="text-center h1">
          Register
        </div>
        <br />
        <div style={{ color: "white" }} className="h4">
          Username
        </div>
        <Form.Control
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          required
        />
        <div style={{ color: "white" }} className="h4">
          Email
        </div>
        <Form.Control
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          required
        />
        <div style={{ color: "white" }} className="h4">
          Password
        </div>
        <Form.Control
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          required
        />
        <div style={{ color: "white" }} className="h4">
          Confirm Password
        </div>
        <Form.Control
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          required
        />
        <Button type="submit">Register</Button>
      </Form>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
