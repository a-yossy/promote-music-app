import { FC, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User, getUserByNameQuery, getUserByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [getUserByName, { loading, error }] = useLazyQuery<
    { userByName: User },
    getUserByNameInput
  >(getUserByNameQuery, {
    onCompleted: (data) => {
      if (data) {
        setLoginUserName(data.userByName.name);
        navigate('/');
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    getUserByName({ variables: { name: value } });
  };

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;

  return (
    <>
      <input value={value} type="text" onChange={handleChange} />
      <button type="submit" onClick={handleLogin}>
        ログイン
      </button>
    </>
  );
};

export default LoginPage;
