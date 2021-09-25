import { FC } from 'react';
import { Artist } from 'lib/artist';

type ArtistListElementProps = {
  artist: Artist;
};

const ArtistListElement: FC<ArtistListElementProps> = ({ artist }) => (
  <>
    <div>{artist.name}</div>
  </>
);

export default ArtistListElement;
