import { useMutation, gql } from "@apollo/client";
import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);
  const Bio = user.Bio;
  if (Bio == null) {
    return addBio;
  }

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
