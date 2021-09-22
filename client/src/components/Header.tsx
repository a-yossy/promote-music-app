import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lib/user';
import { useLocation } from 'react-router';

const Header: FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('loginUser') || '[]'));
  }, [location]);

  return (
    <header>
      <h1>
        <Link to="/">Promote Music App</Link>
      </h1>
      {user?.name ? (
        <div>
          <Link to="/">ログアウト</Link>
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
