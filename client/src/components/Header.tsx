/* eslint-disable import/no-extraneous-dependencies */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import getLoginUserName from 'lib/getLoginUserName';
import logout from 'lib/logout';
import { Typography, IconButton, Toolbar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
    <Toolbar>
      <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
        <Typography color="black" variant="h4">
          Promote Music App
        </Typography>
      </Link>

      <Link to="artists">
        <IconButton>
          <PeopleOutlineIcon />
        </IconButton>
      </Link>
      {userName ? (
        <>
          <Link to={`user/${userName}`}>
            <IconButton>
              <AccountBoxIcon />
            </IconButton>
          </Link>

          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <>
          <div>
            <Link to="signup">
              <IconButton>
                <PersonAddIcon />
              </IconButton>
            </Link>
          </div>
          <div>
            <Link to="login">
              <IconButton edge="end">
                <LoginIcon />
              </IconButton>
            </Link>
          </div>
        </>
      )}
    </Toolbar>
  );
};

export default Header;
