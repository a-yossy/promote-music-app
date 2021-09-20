import gql from "graphql-tag";

export type User = {
  id: number,
  name: string,
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
  query User($id: ID!) {
    user(id: $id) {
      name
      artists {
        id
        name
      }
    }
  }
`;

export const createUserMutation = gql`
  mutation CreateUser($name: String!) {
    createUser(input: { name: $name }) {
      user {
        id
        name
      }
    }
  }
`;
