import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  console.log(postId);
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
