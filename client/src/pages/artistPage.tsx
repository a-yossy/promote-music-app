import React, { FC, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  ArtistsData,
  getArtistsQuery,
  Artist,
  createArtistInput,
  createArtistMutation,
} from 'lib/artist';
import Artists from 'components/Artists';

const ArtistPage: FC = () => {
  const { loading, error, refetch } = useQuery<ArtistsData>(getArtistsQuery);
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
    createArtist({ variables: { name: value } }).catch((e) => {
      console.error(e);
    });
    setValue('');
  };

  useEffect(() => {
    refetch()
      .then((res) => {
        setArtists(res.data.artists);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [refetch, mutationLoading]);

  if (loading || mutationLoading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (mutationError) return <>Error: {mutationError.message}</>;

  return (
    <>
      <input value={value} onChange={handleChange} />
      <button type="submit" onClick={handleCreateArtist}>
        登録
      </button>
      <Artists artists={artists} />
    </>
  );
};

export default ArtistPage;
