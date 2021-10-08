import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { Button, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  FollowArtistInput,
  followArtistMutation,
  User,
  unfollowArtistMutation,
} from 'lib/user';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

type FollowButtonProps = {
  currentUserName: string;
  currentUserArtistsName: Set<string>;
  artist: Artist;
  loading: boolean;
};

const FollowButton: FC<FollowButtonProps> = ({
  currentUserArtistsName,
  currentUserName,
  artist,
  loading,
}) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [follow, { loading: followLoading }] = useMutation<
    { follow: User },
    FollowArtistInput
  >(followArtistMutation);
  const [unfollow, { loading: unfollowLoading }] = useMutation<
    { unfollow: User },
    FollowArtistInput
  >(unfollowArtistMutation);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleFollow = (userName: string, artistName: string) => {
    follow({
      variables: { userName, artistName },
    })
      .then((_) => {
        setIsFollow(true);
      })
      .catch((e: Error) => {
        toast.error(`${e.message}`);
      });
  };

  const handleUnfollow = (userName: string, artistName: string) => {
    unfollow({
      variables: { userName, artistName },
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
  }, [artist, currentUserArtistsName]);

  if (loading)
    return (
      <Button variant="outlined" sx={{ ml: 6 }}>
        <CircularProgress size={24.5} color="inherit" />
      </Button>
    );

  return (
    <>
      {isFollow ? (
        <LoadingButton
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleUnfollow(currentUserName, artist.name)}
          variant="outlined"
          sx={{ ml: 6 }}
          loading={unfollowLoading}
          color={hovered ? 'secondary' : 'primary'}
        >
          {hovered ? 'フォロー解除' : 'フォロー中'}
        </LoadingButton>
      ) : (
        <LoadingButton
          onClick={() => handleFollow(currentUserName, artist.name)}
          variant="contained"
          sx={{ ml: 6 }}
          loading={followLoading}
        >
          フォローする
        </LoadingButton>
      )}
    </>
  );
};

export default FollowButton;
