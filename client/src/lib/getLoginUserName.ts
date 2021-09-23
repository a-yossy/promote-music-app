import { LOCAL_STORAGE_LOGIN_USER_KEY } from 'constant';

const getLoginUserName = (): string => {
  const userName = localStorage.getItem(LOCAL_STORAGE_LOGIN_USER_KEY) || "";

  return userName;
};

export default getLoginUserName;
