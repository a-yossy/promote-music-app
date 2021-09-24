import React, { FC, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Artists from 'components/Artists';
import {
  ArtistsData,
  getArtistsQuery,
  Artist,
  createArtistInput,
  createArtistMutation,
} from 'lib/artist';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';

const ArtistPage: FC = () => {
  const { loading, error, data, refetch } =
    useQuery<ArtistsData>(getArtistsQuery);
  const [createArtist, { error: mutationError, loading: mutationLoading }] =
    useMutation<{ createArtist: Artist }, createArtistInput>(
      createArtistMutation,
    );
  const [artists, setArtists] = useState<Artist[]>([]);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  /* eslint no-console: ["error", { allow: ["error"] }] */
  const handleCreateArtist = () => {
    createArtist({ variables: { name: value } })
      .then((_) => {
        refetch()
          .then((res) => {
            setArtists(res.data.artists);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
    setValue('');
  };

  useEffect(() => {
    if (data) {
      setArtists(data.artists);
    }
  }, [data]);

  if (loading || mutationLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (mutationError) return <>Error: {mutationError.message}</>;

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        sx={{ ml: 3, mt: 4, mb: 2 }}
      />
      <Button onClick={handleCreateArtist} variant="contained" size="small">
        登録
      </Button>
      <Grid container justifyContent="center">
        <Artists artists={artists} card />
      </Grid>
    </>
  );
};

export default ArtistPage;
