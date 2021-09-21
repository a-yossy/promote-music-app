import React, { FC, useState } from 'react';

const LoginPage: FC = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <input value={value} type="text" onChange={handleChange} />
      <button type="submit">ログイン</button>
    </>
  );
};

export default LoginPage;
