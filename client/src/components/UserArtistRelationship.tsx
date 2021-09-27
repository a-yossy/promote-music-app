import { FC, useState, useEffect } from 'react';
import { Artist } from 'lib/artist';
import { useLazyQuery, ApolloError } from '@apollo/client';
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
  const [getUserByName, { loading, data }] = useLazyQuery<
    { userByName: User },
    userByNameInput
  >(getUserByNameQuery, {
    variables: { name: loginUserName },
    onError: (e: ApolloError) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (loginUserName) {
      getUserByName();
    }
  }, [loginUserName, getUserByName]);

  useEffect(() => {
    if (data) {
      setLoginUserArtists(new Set(data.userByName.artists));
    }
  }, [data]);

  if (loading || !data)
    return (
      <Button variant="outlined" disabled sx={{ ml: 6 }}>
        Loading...
      </Button>
    );

  return (
    <Button variant="outlined" sx={{ ml: 6 }}>
      {loginUserArtists?.has(artist) ? 'フォロー中' : 'フォローする'}
    </Button>
  );
};

export default UserArtistRelationship;
