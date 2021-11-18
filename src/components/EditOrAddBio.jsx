import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);
  const Bio = user.Bio;
  console.log(user);
  const editBio = (
    <>
      <h2>Edit Bio</h2>
      <p></p>
      {Bio}
      <Button color="teal">Edit Bio</Button>
    </>
  );
  const addBio = (
    <>
      <Button color="teal">Add Bio</Button>
    </>
  );
  if (Bio === null) return addBio;

  return editBio;
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!) {
    editBio(username: $username, newBio: $newBio) {
      id
      username
    }
  }
`;

const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    getUser(username: $username) {
      id
      username
      createdAt
      Bio
    }
  }
`;

export default EditOrAddBio;
