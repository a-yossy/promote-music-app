import { FC } from 'react';
import { Artist } from 'lib/artist';
import ArtistListElementCard from 'components/ArtistListElementCard';
import Grid from '@mui/material/Grid';

type ArtistsProps = {
  artists: Artist[];
};

const Artists: FC<ArtistsProps> = ({ artists }) => (
  <Grid container sx={{ width: 1200 }}>
    {artists.map((artist) => (
      <ArtistListElementCard key={artist.id} artist={artist} />
    ))}
  </Grid>
);

export default Artists;
