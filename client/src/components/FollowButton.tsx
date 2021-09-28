import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Button } from '@mui/material';

type UserArtistRelationshipProp = {
  currentUserArtists: Set<Artist> | undefined;
  artist: Artist;
  loading: boolean;
};

const UserArtistRelationship: FC<UserArtistRelationshipProp> = ({
  currentUserArtists,
  artist,
  loading,
}) => {
  if (loading || !currentUserArtists)
    return (
      <Button variant="outlined" sx={{ ml: 6 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {currentUserArtists?.has(artist) ? (
        <Button variant="outlined" sx={{ ml: 6 }}>
          フォロー中
        </Button>
      ) : (
        <Button variant="contained" sx={{ ml: 6 }}>
          フォロー
        </Button>
      )}
    </>
  );
};

export default UserArtistRelationship;
