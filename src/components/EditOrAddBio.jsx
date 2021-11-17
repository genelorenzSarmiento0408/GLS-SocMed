import { useMutation, gql } from "@apollo/client";
import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);
  const Bio = user.Bio;

  const editBio = (
    <>
      <p>Edit Bio</p>
    </>
  );
  const addBio = (
    <>
      <button>Add Bio</button>
    </>
  );
  if (Bio == null) {
    return addBio;
  }
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
