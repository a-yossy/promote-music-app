/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CreateUserArtistRelationshipInput,
  createUserArtistRelationshipMutation,
  User,
} from 'lib/user';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

type FollowButtonProps = {
  currentUserArtists: Set<Artist> | undefined;
  currentUserName: string;
  artist: Artist;
  loading: boolean;
};

const FollowButton: FC<FollowButtonProps> = ({
  currentUserArtists,
  currentUserName,
  artist,
  loading,
}) => {
  const [isFollow, setIsFollow] = useState<boolean>();
  const [createUserArtistRelationship, { loading: followLoading }] =
    useMutation<
      { createUserArtistRelationship: User },
      CreateUserArtistRelationshipInput
    >(createUserArtistRelationshipMutation);

  const handleFollow = (userName: string, artistName: string) => {
    createUserArtistRelationship({
      variables: { userName: userName, artistName: artistName },
    })
      .then((_) => {
        setIsFollow(true);
      })
      .catch((e: Error) => {
        toast.error(`${e.message}`);
      });
  };

  useEffect(() => {
    if (currentUserArtists && artist) {
      if (currentUserArtists?.has(artist)) setIsFollow(true);
      else setIsFollow(false);
    }
  }, [artist, currentUserArtists]);

  if (isFollow === undefined || loading)
    return (
      <Button variant="outlined" sx={{ ml: 8 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {isFollow ? (
        <Button variant="outlined" sx={{ ml: 8 }}>
          フォロー中
        </Button>
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
