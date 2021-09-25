import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { createUserMutation, UserData, userByNameInput } from 'lib/user';
import { useNavigate } from 'react-router';
import setLoginUserName from 'lib/setLoginUserName';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation<
    { createUser: UserData },
    userByNameInput
  >(createUserMutation);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  /* eslint no-console: ["error", { allow: ["error"] }] */
  const handleSignup = () => {
    createUser({ variables: { name: value } })
      .then((res) => {
        setLoginUserName(res.data?.createUser.user.name as string);
        navigate('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (loading) return <>Submitting</>;
  if (error) return <>Error: {error.message}</>;

  return (
    <>
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
