import { FC, useState, useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { error, loading, data, fetchMore } = useQuery<ArtistsData>(
    getArtistsQuery,
    {
      variables: {
        offset: 0,
        limit: 20,
      },
      onCompleted: (res) => {
        if (res) {
          setArtists(res.artists);
        }
      },
    },
  );
  const [createArtist] = useMutation<
    { createArtist: Artist },
    createArtistInput
  >(createArtistMutation);

  const handleCreateArtist = () => {
    const ArtistName = inputRef.current?.value
      ? String(inputRef.current?.value)
      : '';
    const toastArtistId = toast.loading('Loading...');
    createArtist({ variables: { name: ArtistName } })
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
    if (inputRef.current?.value) inputRef.current.value = '';
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
  if (error) return <>Error: {error.message}</>;

  return (
    <>
      <Toaster />
      <Input inputRef={inputRef} sx={{ ml: 3, mt: 4, mb: 2 }} />
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
