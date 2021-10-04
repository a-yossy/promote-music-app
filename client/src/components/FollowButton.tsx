import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { Button } from '@mui/material';
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
  currentUserArtists: Set<Artist>;
  artist: Artist;
  loading: boolean;
};

const FollowButton: FC<FollowButtonProps> = ({
  currentUserArtists,
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
    if (currentUserArtists?.has(artist)) setIsFollow(true);
  }, [artist, currentUserArtists]);

  if (loading)
    return (
      <Button variant="outlined" sx={{ ml: 6 }}>
        Loading...
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
