import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { useQuery, ApolloError } from '@apollo/client';
import { User, userByNameInput, getUserByNameQuery } from 'lib/user';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

type UserArtistRelationshipProp = {
  currentUserName: string;
  artist: Artist;
};

const UserArtistRelationship: FC<UserArtistRelationshipProp> = ({
  currentUserName,
  artist,
}) => {
  const [currentUserArtists, setCurrentUserArtists] = useState<Set<Artist>>();
  const { loading, data } = useQuery<{ userByName: User }, userByNameInput>(
    getUserByNameQuery,
    {
      variables: { name: currentUserName },
      onError: (e: ApolloError) => {
        toast.error(e.message);
      },
    },
  );

  useEffect(() => {
    if (data) {
      setCurrentUserArtists(new Set(data.userByName.artists));
    }
  }, [data]);

  if (loading || !currentUserArtists)
    return (
      <Button variant="outlined" disabled sx={{ ml: 6 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {currentUserArtists?.has(artist) ? (
        <Button variant="outlined" sx={{ ml: 6 }}>
          フォロー中
        </Button>
      ) : (
        <Button variant="contained" sx={{ ml: 6 }}>
          フォローする
        </Button>
      )}
    </>
  );
};

export default UserArtistRelationship;
