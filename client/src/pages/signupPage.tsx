import { FC, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { createUserMutation, UserData, UserByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import { Button, Input } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import getLoginUserName from 'lib/getLoginUserName';

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation<{ createUser: UserData }, UserByNameInput>(
    createUserMutation,
  );
  const inputRef = useRef<HTMLInputElement>();

  const handleSignup = () => {
    const UserName = String(inputRef.current?.value);
    const toastSignupId = toast.loading('Loading...');
    createUser({ variables: { name: UserName } })
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
    if (inputRef.current?.value) inputRef.current.value = '';
  };

  useEffect(() => {
    if (getLoginUserName()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Toaster />
      <Input inputRef={inputRef} sx={{ ml: 3, mt: 4, mb: 2 }} />
      <Button onClick={handleSignup} variant="contained" size="small">
        作成
      </Button>
    </>
  );
};

export default SignupPage;
