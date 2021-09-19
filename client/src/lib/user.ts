import gql from "graphql-tag";

export type User = {
  id: number,
  name: string
};

export　const getUsersQuery = gql`
  query Users {
    users {
      id
      name
    }
  }
`;
