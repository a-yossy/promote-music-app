import { FC, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloError, useQuery } from '@apollo/client';
import {
  Artist,
  getCurrentUserArtistsQuery,
  CurrentUserArtistsInput,
} from 'lib/artist';
import ArtistsCard from 'components/ArtistsCard';
import getLoginUserName from 'lib/getLoginUserName';
import { Typography, Grid, CircularProgress, Box, Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import UpdateUserModal from 'components/UpdateUserModal';

const UserPage: FC = () => {
  const params = useParams();
  const paramsUserName = params.name as string;
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loginUser, setLoginUser] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { loading, data, fetchMore, refetch } = useQuery<
    { currentUserArtists: Artist[] },
    CurrentUserArtistsInput
  >(getCurrentUserArtistsQuery, {
    variables: { userName: paramsUserName || '', offset: 0, limit: 20 },
    fetchPolicy: 'network-only',
    onError: (e: ApolloError) => {
      toast.error(e.message);
      navigate('/');
    },
  });

  useEffect(() => {
    refetch()
      .then((res) => {
        setArtists(res.data.currentUserArtists);
        setHasMore(res.data.currentUserArtists.length > 0);
      })
      .catch((e: ApolloError) => {
        toast.error(e.message);
      });
  }, [paramsUserName, refetch]);

  useEffect(() => {
    setLoginUser(getLoginUserName);
  }, [showModal]);

  const getCurrentUserArtistsData = () => {
    fetchMore({
      variables: {
        offset: data?.currentUserArtists.length || 0,
      },
    })
      .then((res) => {
        if (res.data.currentUserArtists.length === 0) setHasMore(false);
        setArtists((prev) => [...prev, ...res.data.currentUserArtists]);
      })
      .catch((e: ApolloError) => {
        toast.error(e.message);
      });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  if (loading)
    return (
      <Box sx={{ ml: 3, mt: 4, mb: 2 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <UpdateUserModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentName={paramsUserName}
      />
      <Toaster />
      <Grid container>
        <Grid item>
          <Typography variant="h5" color="#9e9e9e" sx={{ ml: 3, mt: 4, mb: 2 }}>
            {paramsUserName}
          </Typography>
        </Grid>
        {loginUser === paramsUserName && (
          <Grid item>
            <Button
              onClick={handleOpenModal}
              variant="contained"
              size="small"
              sx={{ ml: 3, mt: 4, mb: 2 }}
            >
              編集
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="center">
        <InfiniteScroll
          loadMore={getCurrentUserArtistsData}
          hasMore={hasMore}
          loader={
            <div key={0}>
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

export default UserPage;
