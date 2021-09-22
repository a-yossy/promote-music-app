import { FC, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User, getUserByNameQuery, getUserByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import { LOCAL_STORAGE_KEY } from 'constant';

const LoginPage: FC = () => {
  const [value, setValue] = useState<string>('');
  const [ getUserByName,{ loading, error, data } ] = useLazyQuery<{ userByName: User }, getUserByNameInput>(getUserByNameQuery);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (userName) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('loginUser', data.userByName.name);
      navigate('/');
    }
  }, [data, navigate])


  const handleClick = () => {
    getUserByName({ variables: { name: value } })
  };

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;

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
