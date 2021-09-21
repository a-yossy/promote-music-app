import { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UsersData, getUsersQuery, User } from 'lib/user';
import { useNavigate } from 'react-router';
import Login from 'lib/login';

const LoginPage: FC = () => {
  const [value, setValue] = useState<string>('');
  const { loading, error, data } = useQuery<UsersData>(getUsersQuery);
  const [users, setUsers] = useState<User[]>([]);
  const [loginError, setLoginError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    const id = Login(users, value);
    if (id === 0) {
      setLoginError(true);
    } else {
      const user = { id, name: value };
      localStorage.setItem('loginUser', JSON.stringify(user));
      navigate('/');
    }
  };

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;
  if (loginError) return <>User not found.</>;

  return (
    <>
      <input value={value} type="text" onChange={handleChange} />
      <button type="submit" onClick={handleClick}>
        ログイン
      </button>
    </>
  );
};

export default LoginPage;
