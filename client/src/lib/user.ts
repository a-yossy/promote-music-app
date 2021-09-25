import gql from 'graphql-tag';
import { Artist } from 'lib/artist';

export type User = {
  id: number;
  name: string;
  artists: Artist[];
};

export type UsersData = {
  users: User[];
};

export type UserData = {
  user: User;
};

export type userByNameInput = {
  name: string;
};

export const getUsersQuery = gql`
  query Users {
    users {
      id
      name
      artists {
        id
        name
      }
    }
  }
`;

export const getUserByNameQuery = gql`
  query UserByName($name: String!) {
    userByName(name: $name) {
      id
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
