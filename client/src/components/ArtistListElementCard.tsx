import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import FollowButton from 'components/FollowButton';

type ArtistListElementCardProps = {
  artist: Artist;
  currentUserArtists: Set<Artist>;
  loading: boolean;
  currentUserName: string;
};

const ArtistListElementCard: FC<ArtistListElementCardProps> = ({
  artist,
  currentUserArtists,
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
                currentUserArtists={currentUserArtists}
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
