import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
      }
    }
  }
`;
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      role
      Bio
    }
  }
`;
