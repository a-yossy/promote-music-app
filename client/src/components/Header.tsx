import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import getLoginUserName from 'lib/getLoginUserName';

const Header: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const localStorageUserName = getLoginUserName();
    setUserName(localStorageUserName);
  }, [location]);

  return (
    <header>
      <h1>
        <Link to="/">Promote Music App</Link>
      </h1>
      {userName ? (
        <div>
          <Link to="/signout">ログアウト</Link>
        </div>
      ) : (
        <>
          <div>
            <Link to="signup">ユーザー作成</Link>
          </div>
          <div>
            <Link to="login">ログイン</Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
