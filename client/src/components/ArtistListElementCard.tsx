import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import FollowButton from 'components/FollowButton';

type ArtistListElementCardProps = {
  artist: Artist;
  currentUserArtistsName: Set<string>;
  loading: boolean;
  currentUserName: string;
};

const ArtistListElementCard: FC<ArtistListElementCardProps> = ({
  artist,
  currentUserArtistsName,
  loading,
  currentUserName,
}) => (
  <Grid item xs={6}>
    <Card sx={{ width: 550, backgroundColor: '#e1f5fe', m: 2 }}>
      <CardContent>
        <Grid container>
          <Grid item sm={8}>
            <Typography variant="h5">{artist.name}</Typography>
          </Grid>
          <Grid item sm={4}>
            {currentUserName && (
              <FollowButton
                artist={artist}
                currentUserArtistsName={currentUserArtistsName}
                loading={loading}
                currentUserName={currentUserName}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default ArtistListElementCard;
