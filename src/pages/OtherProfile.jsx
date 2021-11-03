import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  console.log(postId);
  const { user } = useContext(AuthContext);
  return <div></div>;
};

export const FETCH_USER_QUERY = gql`
  {
    getUser(id: id) {
      id
      role
      Bio
    }
  }
`;
export default OtherProfile;
