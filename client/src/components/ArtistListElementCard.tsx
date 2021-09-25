import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid } from '@mui/material';

type ArtistListElementProps = {
  artist: Artist;
};

const ArtistListElement: FC<ArtistListElementProps> = ({ artist }) => (
  <>
    <Grid item xs={6}>
      <Card sx={{ width: 550, backgroundColor: '#e1f5fe', m: 2 }}>
        <CardContent>
          <Typography variant="h5">{artist.name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default ArtistListElement;
