import { useMutation, gql } from "@apollo/client";
import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  const { user } = useContext(AuthContext);

  return <div></div>;
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!)
`;

export default EditOrAddBio;
