import { LOCAL_STORAGE_KEY } from 'constant';

const getLoginUserName = (): string => {
  const userName = localStorage.getItem(LOCAL_STORAGE_KEY) || "";

  return userName;
};

export default getLoginUserName;
