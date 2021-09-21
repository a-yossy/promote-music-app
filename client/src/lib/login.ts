import { User } from 'lib/user';

const Login = (users: User[], name: string): number => {
  let id = 0;
  users.forEach((user) => {
    if (user.name === name) {
      id = user.id;
    }
  });

  return id;
};

export default Login;
