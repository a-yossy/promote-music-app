import gql from 'graphql-tag';
import { Artist } from './artist';

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

export type getUserById = {
  id: number;
};

export type loginUserByNameInput = {
  name: string
}

export const getUsersQuery = gql`
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

export const loginUserByNameQuery = gql`
  query LoginUser($name: String!) {
    loginUser(name: $name) {
      id
      name
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
