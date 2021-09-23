import { FC, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User, getUserByNameQuery, getUserByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [getUserByName, { loading, error }] = useLazyQuery<
    { userByName: User },
    getUserByNameInput
  >(getUserByNameQuery, {
    onCompleted: (data) => {
      if (data) {
        localStorage.setItem('loginUser', data.userByName.name);
        navigate('/');
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    getUserByName({ variables: { name: value } });
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
