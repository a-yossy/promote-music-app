import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import getLoginUserName from 'lib/getLoginUserName';
import logout from 'lib/logout';

const SignoutPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLoginUserName();
    if (user) {
      logout();
    }
    navigate('/');
  });

  return <>ログアウト中</>;
};

export default SignoutPage;
