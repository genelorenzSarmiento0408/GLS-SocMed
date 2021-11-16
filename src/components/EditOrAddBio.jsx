import { useMutation, gql } from "@apollo/client";
import React from "react";

import { AuthContext } from "../context/auth";

const EditOrAddBio = () => {
  return <div></div>;
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!)
`;

export default EditOrAddBio;
