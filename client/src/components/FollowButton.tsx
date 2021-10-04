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
  const [createUserArtistRelationship, { loading: followLoading }] =
    useMutation<{ createUserArtistRelationship: User }, FollowArtistInput>(
      followArtistMutation,
    );
  const [unfollow, { loading: unfollowLoading }] = useMutation<
    { unfollow: User },
    FollowArtistInput
  >(unfollowArtistMutation);

  const handleFollow = (userName: string, artistName: string) => {
    createUserArtistRelationship({
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
      <Button variant="outlined" sx={{ ml: 8 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {isFollow ? (
        <LoadingButton
          onClick={() => handleUnfollow(currentUserName, artist.name)}
          variant="outlined"
          sx={{ ml: 8 }}
          loading={unfollowLoading}
        >
          フォロー中
        </LoadingButton>
      ) : (
        <LoadingButton
          onClick={() => handleFollow(currentUserName, artist.name)}
          variant="contained"
          sx={{ ml: 8 }}
          loading={followLoading}
        >
          フォロー
        </LoadingButton>
      )}
    </>
  );
};

export default FollowButton;
