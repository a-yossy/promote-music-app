import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getUserByNameQuery, userByNameInput, User } from 'lib/user';
import { Artist } from 'lib/artist';
import ArtistsCard from 'components/ArtistsCard';
import { Typography, Grid } from '@mui/material';

const UserPage: FC = () => {
  const params = useParams();
  const paramsUserName = params.name;
  const { loading, error, data } = useQuery<
    { userByName: User },
    userByNameInput
  >(getUserByNameQuery, {
    variables: { name: paramsUserName || '' },
  });
  const [userName, setUserName] = useState<string>('');
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (data) {
      setUserName(data.userByName.name);
      setArtists(data.userByName.artists);
    }
  }, [data]);

  if (loading)
    return (
      <Typography variant="h5" sx={{ ml: 3, mt: 4, mb: 2 }}>
        Loading...
      </Typography>
    );
  if (error) return <>Error: {error.message}</>;

  return (
    <>
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
