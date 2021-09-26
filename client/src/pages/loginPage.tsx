import { FC, useState } from 'react';
import { ApolloError, useApolloClient } from '@apollo/client';
import { getUserByNameQuery, User } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    const toastSignupId = toast.loading('Loading...');
    const signupNotify = () => toastSignupId;
    signupNotify();
    client
      .query({ query: getUserByNameQuery, variables: { name: value } })

      .then((res) => {
        const data = res.data as { userByName: User };
        setLoginUserName(data.userByName.name);
        toast.success('Login Is Successful', {
          id: toastSignupId,
        });
        navigate('/');
      })
      .catch((e: ApolloError) => {
        toast.error(`${e.message}`, {
          id: toastSignupId,
        });
      });
    setValue('');
  };

  return (
    <>
      <Toaster />

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
