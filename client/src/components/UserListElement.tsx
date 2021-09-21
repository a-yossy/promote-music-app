import { FC } from 'react';
import { User } from 'lib/user';
import { Link } from 'react-router-dom';

type UserListElementProps = {
  user: User;
};

const UserListElement: FC<UserListElementProps> = ({ user }) => (
  <div>
    <Link to={`/user/${user.id}`}>{user.name}</Link>
  </div>
);

export default UserListElement;
