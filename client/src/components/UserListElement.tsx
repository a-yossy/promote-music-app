import { FC } from 'react';
import { User } from 'lib/user';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import Artists from 'components/Artists';

type UserListElementProps = {
  user: User;
};

const UserListElement: FC<UserListElementProps> = ({ user }) => (
  <Grid item xs={6}>
    <Card sx={{ width: 550, height: 180, backgroundColor: '#e0f7fa', m: 2 }}>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Artists artists={user.artists.slice(0, 3)} card={false} />
      </CardContent>
      <CardActions>
        <Typography variant="body2">
          <Link to={`/user/${user.name}`} style={{ textDecoration: 'none' }}>
            View Profile
          </Link>
        </Typography>
      </CardActions>
    </Card>
  </Grid>
);

export default UserListElement;
