import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => (
  <header>
    <h1>
      <Link to="/">Promote Music App</Link>
    </h1>
    <div>
      <Link to="signup">ユーザー作成</Link>
    </div>
    <div>
      <Link to="*">ログイン</Link>
    </div>
  </header>
);

export default Header;
