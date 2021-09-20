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

export const getUserByIdQuery = gql`
  query User($id: Int!) {
    user(id: $id) {
      name
      artists {
        id
        name
      }
    }
  }
`
