import { LOCAL_STORAGE_KEY } from 'constant';

const localStorageGetItem = (): string | null => {
  const userName = localStorage.getItem(LOCAL_STORAGE_KEY);

  return userName;
};

export default localStorageGetItem;
