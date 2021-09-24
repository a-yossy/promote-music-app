import { FC } from 'react';
import { Artist } from 'lib/artist';
import ArtistListElement from 'components/ArtistListElement';
import Grid from '@mui/material/Grid';

type ArtistsProps = {
  artists: Artist[];
  card: boolean;
};

const Artists: FC<ArtistsProps> = ({ artists, card }) => (
  <>
    {card ? (
      <Grid container sx={{ width: 1200 }}>
        {artists.map((artist) => (
          <ArtistListElement key={artist.id} artist={artist} card={card} />
        ))}
      </Grid>
    ) : (
      <>
        {artists.map((artist) => (
          <ArtistListElement key={artist.id} artist={artist} card={card} />
        ))}
      </>
    )}
  </>
);

export default Artists;
