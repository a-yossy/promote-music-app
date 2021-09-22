import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User } from 'lib/user';

const SignoutPage: FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('loginUser');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser') || '[]') as User;
    if (user?.name) {
      logout();
    }
    navigate('/');
  });

  return <>ログアウト中</>;
};

export default SignoutPage;
