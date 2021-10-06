import React, { FC, useState } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import ArtistsCard from 'components/ArtistsCard';
import {
  ArtistsData,
  getArtistsQuery,
  Artist,
  createArtistInput,
  createArtistMutation,
} from 'lib/artist';
import { Button, Input, Grid, CircularProgress, Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroller';

const ArtistPage: FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [value, setValue] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { loading, data, fetchMore } = useQuery<ArtistsData>(getArtistsQuery, {
    variables: {
      offset: 0,
      limit: 20,
    },
    onCompleted: (res) => {
      if (res) {
        setArtists(res.artists);
      }
    },
  });
  const [createArtist] = useMutation<
    { createArtist: Artist },
    createArtistInput
  >(createArtistMutation);

  console.log(artists);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCreateArtist = () => {
    const toastArtistId = toast.loading('Loading...');
    createArtist({ variables: { name: value } })
      .then((_) => {
        toast.success('Artist Created', {
          id: toastArtistId,
        });
        setHasMore(true);
      })
      .catch((e: Error) => {
        toast.error(`${e.message}`, {
          id: toastArtistId,
        });
      });
    setValue('');
  };

  const getArtistsData = () => {
    fetchMore({
      variables: { offset: data?.artists.length || 0 },
    })
      .then((res) => {
        if (res.data.artists.length === 0) setHasMore(false);
        setArtists((prev) => [...prev, ...res.data.artists]);
      })
      .catch((e: ApolloError) => {
        toast.error(e.message);
      });
  };

  if (loading)
    return (
      <Box sx={{ ml: 3, mt: 12, mb: 2 }}>
        <CircularProgress />
      </Box>
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
        <InfiniteScroll
          loadMore={getArtistsData}
          hasMore={hasMore}
          loader={
            <div key={0}>
              {' '}
              <CircularProgress sx={{ mt: 5, ml: 72 }} />
            </div>
          }
          initialLoad={false}
        >
          <ArtistsCard artists={artists} />
        </InfiniteScroll>
      </Grid>
    </>
  );
};

export default ArtistPage;
