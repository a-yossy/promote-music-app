import { FC } from "react";
import { User } from "lib/user";

type UserProps = {
  user: User
}

const UserListElement: FC<UserProps> = ({ user }) => {
  return (
    <div>
      {user.name}
    </div>
  )
};

export default UserListElement;
