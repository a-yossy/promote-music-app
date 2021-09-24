import { FC } from 'react';
import { User } from 'lib/user';
import UserListElement from 'components/UserListElement';
import Grid from '@mui/material/Grid';

type UsersProps = {
  users: User[];
};

const Users: FC<UsersProps> = ({ users }) => (
  <>
    <Grid container sx={{ width: 1200 }}>
      {users.map((user) => (
        <UserListElement key={user.id} user={user} />
      ))}
    </Grid>
  </>
);

export default Users;
