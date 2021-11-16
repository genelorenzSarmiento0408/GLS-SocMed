import { useMutation, gql } from "@apollo/client";
import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);
  const Bio = user.Bio;
  const editoraddbio = Bio != null ? "" : "";
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
  return <div></div>;
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!)
`;

export default EditOrAddBio;
