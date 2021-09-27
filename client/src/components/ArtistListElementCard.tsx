import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import getLoginUserName from 'lib/getLoginUserName';
import UserArtistRelationship from 'components/UserArtistRelationship';

type ArtistListElementProps = {
  artist: Artist;
};

const ArtistListElement: FC<ArtistListElementProps> = ({ artist }) => {
  const loginUserName = getLoginUserName();

  return (
    <Grid item xs={6}>
      <Card sx={{ width: 550, backgroundColor: '#e1f5fe', m: 2 }}>
        <CardContent>
          <Grid container>
            <Grid item sm={8}>
              <Typography variant="h5">{artist.name}</Typography>
            </Grid>
            <Grid item sm={4}>
              {loginUserName && (
                <UserArtistRelationship
                  loginUserName={loginUserName}
                  artist={artist}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistListElement;
