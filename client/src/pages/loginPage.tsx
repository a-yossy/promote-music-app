import { FC, useState, useEffect } from 'react';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { getUserByNameQuery, User, userByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import toast, { Toaster } from 'react-hot-toast';
import getLoginUserName from 'lib/getLoginUserName';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [toastLoginId, setToastLoginId] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [getUserByName] = useLazyQuery<{ userByName: User }, userByNameInput>(
    getUserByNameQuery,
    {
      onCompleted: (data) => {
        if (data) {
          setLoginUserName(data.userByName.name);
          toast.success('Login Is Successful', {
            id: toastLoginId,
          });
          navigate('/');
        }
      },
      onError: (e: ApolloError) => {
        toast.error(`${e.message}`, {
          id: toastLoginId,
        });
      },
    },
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleLogin = () => {
    setToastLoginId(toast.loading('Loading...'));
    getUserByName({ variables: { name: value } });
    setValue('');
  };

  useEffect(() => {
    if (getLoginUserName()) {
      navigate('/');
    }
  }, [navigate]);

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
