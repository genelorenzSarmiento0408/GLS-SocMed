import React from "react";

import { useMutation, gql } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

const EditButton = () => {
  return <div></div>;
};

const EDIT_TITLE = gql`
  mutation ($editTitle: String!) {
    editTitle(editTitle: $editTitle) {
      postId
      username
    }
  }
`;

export default EditButton;
