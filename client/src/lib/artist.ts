import gql from 'graphql-tag';

export type Artist = {
  id: number;
  name: string;
};

export type ArtistsData = {
  artists: Artist[];
};

export type createArtistInput = {
  name: string;
};

export const getArtistsQuery = gql`
  query Artists($offset: Int!, $limit: Int!) {
    artists(offset: $offset, limit: $limit) {
      id
      name
    }
  }
`;

export const createArtistMutation = gql`
  mutation CreateArtist($name: String!) {
    createArtist(input: { name: $name }) {
      artist {
        id
        name
      }
    }
  }
`;
