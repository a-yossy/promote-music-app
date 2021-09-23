import { LOCAL_STORAGE_LOGIN_USER_KEY } from 'constant';

const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_LOGIN_USER_KEY);
};

export default logout;
