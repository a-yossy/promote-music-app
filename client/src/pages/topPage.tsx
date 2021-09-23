import { FC, useState, useEffect } from 'react';
import { getUsersQuery, User, UsersData } from 'lib/user';
import { useQuery } from '@apollo/client';
import Users from 'components/Users';

const TopPage: FC = () => {
  const { loading, error, refetch } = useQuery<UsersData>(getUsersQuery);
  const [users, setUsers] = useState<User[]>([]);

  /* eslint no-console: ["error", { allow: ["error"] }] */
  useEffect(() => {
    refetch()
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [refetch]);

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;

  return <Users users={users} />;
};

export default TopPage;
