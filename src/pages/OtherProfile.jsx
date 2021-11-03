import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  console.log(id);
  const { user } = useContext(AuthContext);
  return <div></div>;
};

export const FETCH_USER_QUERY = gql`
  query ($id: ID!) {
    getUser(id: $id) {
      id
      username
      Bio
      role
    }
  }
`;
export default OtherProfile;
