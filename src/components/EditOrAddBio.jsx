import { useMutation, gql } from "@apollo/client";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);
  const Bio = user.Bio;

  const editBio = (
    <>
      <p>Edit Bio</p>
      <Button></Button>
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

export default EditOrAddBio;
