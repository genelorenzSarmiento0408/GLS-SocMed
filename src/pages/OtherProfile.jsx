import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const OtherProfile = (props, args = {}) => {
  const id = props.match.params.id;
  return <div></div>;
};

export default OtherProfile;
