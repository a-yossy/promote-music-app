import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { createUserMutation, UserData, userByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import { Button, Input } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation<{ createUser: UserData }, userByNameInput>(
    createUserMutation,
  );
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSignup = () => {
    const toastSignupId = toast.loading('Loading...');
    createUser({ variables: { name: value } })
      .then((res) => {
        setLoginUserName(res.data?.createUser.user.name as string);
        toast.success('User Created', {
          id: toastSignupId,
        });
        navigate('/');
      })

      .catch((e: Error) => {
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
      <Button onClick={handleSignup} variant="contained" size="small">
        作成
      </Button>
    </>
  );
};

export default SignupPage;
