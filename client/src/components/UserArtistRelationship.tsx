import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { useQuery, ApolloError } from '@apollo/client';
import { User, userByNameInput, getUserByNameQuery } from 'lib/user';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

type UserArtistRelationshipProp = {
  loginUserName: string;
  artist: Artist;
};

const UserArtistRelationship: FC<UserArtistRelationshipProp> = ({
  loginUserName,
  artist,
}) => {
  const [loginUserArtists, setLoginUserArtists] = useState<Set<Artist>>();
  const { loading, data } = useQuery<{ userByName: User }, userByNameInput>(
    getUserByNameQuery,
    {
      variables: { name: loginUserName },
      onError: (e: ApolloError) => {
        toast.error(e.message);
      },
    },
  );

  useEffect(() => {
    if (data) {
      setLoginUserArtists(new Set(data.userByName.artists));
    }
  }, [data]);

  if (loading || !loginUserArtists)
    return (
      <Button variant="outlined" disabled sx={{ ml: 6 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {loginUserArtists?.has(artist) ? (
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
