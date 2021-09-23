import gql from 'graphql-tag';

export type Artist = {
  id: number;
  name: string;
};

export type ArtistsData = {
  artists: Artist[];
};

export const getArtistsQuery = gql`
  query Artists {
    artists {
      id
      name
    }
  }
`;

export const createArtistMutation = gql`
  mutation CreateArtist($name: String!) {
    createArtist(name: $name) {
      artist {
        id
        name
      }
    }
  }
`;
