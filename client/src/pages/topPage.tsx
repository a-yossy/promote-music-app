import { FC, useState } from 'react';
import { getUsersQuery, User, UsersData } from 'lib/user';
import { useQuery, ApolloError } from '@apollo/client';
import Users from 'components/Users';
import Grid from '@mui/material/Grid';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgress, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';

const TopPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { loading, error, fetchMore, data } = useQuery<UsersData>(
    getUsersQuery,
    {
      variables: {
        offset: 0,
        limit: 20,
      },
      onCompleted: (res) => {
        if (res) {
          setUsers(res.users);
        }
      },
    },
  );

  const getUsersData = () => {
    fetchMore({
      variables: { offset: data?.users.length || 0 },
    })
      .then((res) => {
        if (res.data.users.length === 0) setHasMore(false);
        setUsers((prev) => [...prev, ...res.data.users]);
      })
      .catch((e: ApolloError) => {
        toast.error(e.message);
      });
  };

  if (loading)
    return (
      <Box sx={{ ml: 3, mt: 4, mb: 2 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <>Error: {error.message}</>;

  return (
    <>
      <Toaster />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <InfiniteScroll
          loadMore={getUsersData}
          hasMore={hasMore}
          loader={
            <div key={0}>
              <CircularProgress sx={{ mt: 5, ml: 72 }} />
            </div>
          }
          initialLoad={false}
        >
          <Users users={users} />
        </InfiniteScroll>
      </Grid>
    </>
  );
};

export default TopPage;
