import React from "react";
import { gql, useQuery } from "@apollo/client";

const Messages = () => {
  const { data } = useQuery(GET_MESSAGES);
  if (!data) return null;

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

export default Messages;
