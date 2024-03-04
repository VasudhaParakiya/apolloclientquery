import { gql } from "@apollo/client";

export const GET_All_USER = gql`
  query GetAllUser(
    $page: Int
    $limit: Int
    $filter: String
    $sort: userSort
    $search: String
  ) {
    getAllUser(
      page: $page
      limit: $limit
      filter: $filter
      sort: $sort
      search: $search
    ) {
      count
      data {
        id
        email
        userName
        fullName
        mobile
        profilePicture
        gender
      }
    }
  }
`;
