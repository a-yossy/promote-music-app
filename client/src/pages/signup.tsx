import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { createUserMutation } from 'lib/user';
import { useNavigate } from 'react-router';

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(createUserMutation);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  /* eslint no-console: ["error", { allow: ["error"] }] */
  const handleClick = () => {
    createUser({ variables: { name: value } })
      .then((_) => {
        navigate('/', { replace: true });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (loading) return <>Submitting</>;
  if (error) return <>Error: {error.message}</>;

  return (
    <>
      <input onChange={handleChange} value={value} type="text" />
      <button type="submit" onClick={handleClick}>
        登録
      </button>
    </>
  );
};

export default SignupPage;
