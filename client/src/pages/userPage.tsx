/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloError, useQuery } from '@apollo/client';
import { getUserByNameQuery, UserByNameInput, User } from 'lib/user';
import { Artist } from 'lib/artist';
import ArtistsCard from 'components/ArtistsCard';
import { Typography, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const UserPage: FC = () => {
  const params = useParams();
  const paramsUserName = params.name;
  const navigate = useNavigate();
  const { loading, refetch } = useQuery<{ userByName: User }, UserByNameInput>(
    getUserByNameQuery,
    {
      variables: { name: paramsUserName || '' },
      onError: (e: ApolloError) => {
        toast.error(e.message);
        navigate('/');
      },
    },
  );
  const [userName, setUserName] = useState<string>('');
  const [artists, setArtists] = useState<Artist[]>([]);

  /* eslint no-console: ["error", { allow: ["error"] }] */
  useEffect(() => {
    refetch()
      .then((res) => {
        setUserName(res.data.userByName.name);
        setArtists(res.data.userByName.artists);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [refetch]);

  if (loading)
    return (
      <Typography variant="h5" sx={{ ml: 3, mt: 4, mb: 2 }}>
        Loading...
      </Typography>
    );

  return (
    <>
      <Toaster />
      <Typography variant="h5" color="#9e9e9e" sx={{ ml: 3, mt: 4, mb: 2 }}>
        {userName}
      </Typography>
      <Grid container justifyContent="center">
        <ArtistsCard artists={artists} />
      </Grid>
    </>
  );
};

export default UserPage;
