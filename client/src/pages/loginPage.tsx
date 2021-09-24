import { FC, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User, getUserByNameQuery, userByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [getUserByName, { loading, error }] = useLazyQuery<
    { userByName: User },
    userByNameInput
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
      <Input
        value={value}
        onChange={handleChange}
        sx={{ ml: 3, mt: 4, mb: 2 }}
      />
      <Button onClick={handleLogin} size="small" variant="contained">
        ログイン
      </Button>
    </>
  );
};

export default LoginPage;
