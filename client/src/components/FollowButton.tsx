import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Button } from '@mui/material';

type UserArtistRelationshipProp = {
  currentUserArtists: Set<Artist>;
  artist: Artist;
};

const UserArtistRelationship: FC<UserArtistRelationshipProp> = ({
  currentUserArtists,
  artist,
}) => (
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

export default UserArtistRelationship;
