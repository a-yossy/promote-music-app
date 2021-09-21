import { FC, useState, useEffect } from 'react';
import { getUsersQuery, User, UsersData } from 'lib/user';
import { useQuery } from '@apollo/client';
import Users from 'components/Users';

const TopPage: FC = () => {
  const { loading, error, data } = useQuery<UsersData>(getUsersQuery);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data]);

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;

  return <Users users={users} />;
};

export default TopPage;
