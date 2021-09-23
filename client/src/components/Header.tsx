import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import getLoginUserName from 'lib/getLoginUserName';
import logout from 'lib/logout';

const Header: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
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
