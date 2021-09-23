import gql from 'graphql-tag';

export type Artist = {
  id: number;
  name: string;
};

export const getArtistsQuery = gql`
  query Artists {
    artists {
      id
      name
    }
  }
`;
