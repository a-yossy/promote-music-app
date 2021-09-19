import gql from "graphql-tag";

export type User = {
  id: number,
  name:string
};

export　const usersQuery = gql`
  query Users {
    users {
      id
      name
    }
  }
`;
