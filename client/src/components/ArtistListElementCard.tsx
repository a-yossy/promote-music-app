import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import getLoginUserName from 'lib/getLoginUserName';
import UserArtistRelationship from 'components/FollowButton';
import { useLazyQuery, ApolloError } from '@apollo/client';
import { User, UserByNameInput, getUserByNameQuery } from 'lib/user';
import toast from 'react-hot-toast';

type ArtistListElementCardProps = {
  artist: Artist;
};

const ArtistListElementCard: FC<ArtistListElementCardProps> = ({ artist }) => {
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentUserArtists, setCurrentUserArtists] = useState<Set<Artist>>();
  const [getUserByName] = useLazyQuery<{ userByName: User }, UserByNameInput>(
    getUserByNameQuery,
    {
      variables: { name: currentUserName },
      onCompleted: (res) => {
        setCurrentUserArtists(new Set(res.userByName.artists));
      },
      onError: (e: ApolloError) => {
        toast.error(e.message);
      },
    },
  );

  useEffect(() => {
    setCurrentUserName(getLoginUserName());
  }, [setCurrentUserName]);

  useEffect(() => {
    if (currentUserName) {
      getUserByName();
    }
  }, [currentUserName, getUserByName]);

  return (
    <Grid item xs={6}>
      <Card sx={{ width: 550, backgroundColor: '#e1f5fe', m: 2 }}>
        <CardContent>
          <Grid container>
            <Grid item sm={8}>
              <Typography variant="h5">{artist.name}</Typography>
            </Grid>
            <Grid item sm={4}>
              {currentUserName &&
                (currentUserArtists ? (
                  <UserArtistRelationship
                    artist={artist}
                    currentUserArtists={currentUserArtists}
                  />
                ) : (
                  <Button variant="outlined" disabled sx={{ ml: 6 }}>
                    Loading...
                  </Button>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistListElementCard;
