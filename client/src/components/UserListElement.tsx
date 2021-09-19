import { FC } from "react";
import { User } from "lib/user";

type UserListElementProps = {
  user: User
}

const UserListElement: FC<UserListElementProps> = ({ user }) => {
  return (
    <div>
      {user.name}
    </div>
  )
};

export default UserListElement;
