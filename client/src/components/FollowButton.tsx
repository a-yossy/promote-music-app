import { FC, useState, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type FollowButtonProps = {
  loading: boolean;
  followLoading: boolean;
  unfollowLoading: boolean;
  isFollow: boolean;
  handleFollow: () => void;
  handleUnfollow: () => void;
  isFollowLoading: boolean;
};

const FollowButton: FC<FollowButtonProps> = memo(
  ({
    loading,
    followLoading,
    unfollowLoading,
    isFollow,
    handleFollow,
    handleUnfollow,
    isFollowLoading,
  }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    if (isFollowLoading || loading)
      return (
        <Button variant="outlined" sx={{ ml: 6 }}>
          <CircularProgress size={24.5} color="inherit" />
        </Button>
      );

    return (
      <>
        {isFollow ? (
          <LoadingButton
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleUnfollow}
            variant="outlined"
            sx={{ ml: 6 }}
            loading={unfollowLoading}
            color={hovered ? 'secondary' : 'primary'}
          >
            {hovered ? 'フォロー解除' : 'フォロー中'}
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={handleFollow}
            variant="contained"
            sx={{ ml: 6 }}
            loading={followLoading}
          >
            フォローする
          </LoadingButton>
        )}
      </>
    );
  },
);

export default FollowButton;
