import { LOCAL_STORAGE_LOGIN_USER_KEY } from 'constant';

const setLoginUserName = (userName: string): void => {
  localStorage.setItem(LOCAL_STORAGE_LOGIN_USER_KEY, userName);
};

export default setLoginUserName;
