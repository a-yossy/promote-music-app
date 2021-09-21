import { FC } from 'react';
import { Artist } from 'lib/artist';
import ArtistListElement from 'components/ArtistListElement';

type ArtistsProps = {
  artists: Artist[];
};

const Artists: FC<ArtistsProps> = ({ artists }) => (
  <>
    {artists.map((artist) => (
      <ArtistListElement key={artist.id} artist={artist} />
    ))}
  </>
);

export default Artists;
