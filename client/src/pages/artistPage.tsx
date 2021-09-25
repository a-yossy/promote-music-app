import React, { FC, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ArtistsCard from 'components/ArtistsCard';
import {
  ArtistsData,
  getArtistsQuery,
  Artist,
  createArtistInput,
  createArtistMutation,
} from 'lib/artist';
import { Typography, Button, Input, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const ArtistPage: FC = () => {
  const { loading, data, refetch } = useQuery<ArtistsData>(getArtistsQuery);
  const [createArtist] = useMutation<
    { createArtist: Artist },
    createArtistInput
  >(createArtistMutation);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCreateArtist = () => {
    const toastArtistId = toast.loading('Loading...');
    const artistNotify = () => toastArtistId;
    artistNotify();
    createArtist({ variables: { name: value } })
      .then((_) => {
        refetch()
          .then((res) => {
            setArtists(res.data.artists);
            toast.success('Artist Created', {
              id: toastArtistId,
            });
          })
          .catch((e: Error) => {
            toast.error(`${e.message}`, {
              id: toastArtistId,
            });
          });
      })
      .catch((e: Error) => {
        toast.error(`${e.message}`, {
          id: toastArtistId,
        });
      });
    setValue('');
  };

  useEffect(() => {
    if (data) {
      setArtists(data.artists);
    }
  }, [data]);

  if (loading)
    return (
      <Typography variant="h5" sx={{ ml: 3, mt: 12, mb: 2 }}>
        Loading...
      </Typography>
    );

  return (
    <>
      <Toaster />
      <Input
        value={value}
        onChange={handleChange}
        sx={{ ml: 3, mt: 4, mb: 2 }}
      />
      <Button onClick={handleCreateArtist} variant="contained" size="small">
        登録
      </Button>
      <Grid container justifyContent="center">
        <ArtistsCard artists={artists} />
      </Grid>
    </>
  );
};

export default ArtistPage;
