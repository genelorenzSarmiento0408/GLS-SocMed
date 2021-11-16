import gql from "graphql-tag";
import React from "react";

const EditOrAddBio = () => {
  return <div></div>;
};

const EDITORADDBIO = gql`
  mutation EDITORADDBIO($username: String!, $newBio: String!)
`;
gql;

export default EditOrAddBio;
