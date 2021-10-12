import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import FollowButton from 'components/FollowButton';
import {
  FollowArtistInput,
  followArtistMutation,
  User,
  unfollowArtistMutation,
} from 'lib/user';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

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
}) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(true);
  const [follow, { loading: followLoading }] = useMutation<
    { follow: User },
    FollowArtistInput
  >(followArtistMutation);
  const [unfollow, { loading: unfollowLoading }] = useMutation<
    { unfollow: User },
    FollowArtistInput
  >(unfollowArtistMutation);

  const handleFollow = () => {
    follow({
      variables: { userName: currentUserName, artistName: artist.name },
    })
      .then((_) => {
        setIsFollow(true);
      })
      .catch((e: Error) => {
        toast.error(`${e.message}`);
      });
  };

  const handleUnfollow = () => {
    unfollow({
      variables: { userName: currentUserName, artistName: artist.name },
    })
      .then((_) => {
        setIsFollow(false);
      })
      .catch((e: Error) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    if (currentUserArtistsName?.has(artist.name)) setIsFollow(true);
    setIsFollowLoading(false);
  }, [artist, currentUserArtistsName]);

  return (
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
                  loading={loading}
                  followLoading={followLoading}
                  unfollowLoading={unfollowLoading}
                  isFollow={isFollow}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                  isFollowLoading={isFollowLoading}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistListElementCard;
