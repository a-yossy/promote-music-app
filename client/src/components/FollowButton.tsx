import { FC } from 'react';
import { Artist } from 'lib/artist';
import { Button } from '@mui/material';

type FollowButtonProps = {
  currentUserArtists: Set<Artist>;
  artist: Artist;
  loading: boolean;
};

const FollowButton: FC<FollowButtonProps> = ({
  currentUserArtists,
  artist,
  loading,
}) => {
  if (loading || !currentUserArtists)
    return (
      <Button variant="outlined" sx={{ ml: 8 }}>
        Loading...
      </Button>
    );

  return (
    <>
      {currentUserArtists?.has(artist) ? (
        <Button variant="outlined" sx={{ ml: 8 }}>
          フォロー中
        </Button>
      ) : (
        <Button variant="contained" sx={{ ml: 8 }}>
          フォロー
        </Button>
      )}
    </>
  );
};

export default FollowButton;
