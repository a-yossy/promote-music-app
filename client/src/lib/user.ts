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

export type UserByNameInput = {
  name: string;
};

export type FollowArtistInput = {
  userName: string;
  artistName: string;
};

export type UpdateUserInput = {
  currentName: string;
  updateName: string;
};

export const getUsersQuery = gql`
  query Users($offset: Int!, $limit: Int!) {
    users(offset: $offset, limit: $limit) {
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

export const followArtistMutation = gql`
  mutation CreateUserArtistRelationship(
    $userName: String!
    $artistName: String!
  ) {
    createUserArtistRelationship(
      input: { userName: $userName, artistName: $artistName }
    ) {
      user {
        id
        name
      }
    }
  }
`;

export const unfollowArtistMutation = gql`
  mutation DeleteUserArtistRelationship(
    $userName: String!
    $artistName: String!
  ) {
    deleteUserArtistRelationship(
      input: { userName: $userName, artistName: $artistName }
    ) {
      user {
        id
        name
      }
    }
  }
`;

export const updateUserMutation = gql`
  mutation UpdateUser($currentName: String!, $updateName: String!) {
    updateUser(input: { currentName: $currentName, updateName: $updateName }) {
      user {
        id
        name
      }
    }
  }
`;
