import React from "react";

import { useMutation, gql } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

const EditButton = () => {
  return <div></div>;
};

const EDIT_TITLE = gql`
    mutation editTitle($editTitle: String){

    }
`;

export default EditButton;
