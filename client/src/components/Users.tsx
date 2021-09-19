import { FC } from "react";
import { User } from "lib/user"
import UserListElement from "components/UserListElement";

type UsersProps = {
  users: User[]
}

const Users: FC<UsersProps> =({ users }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <UserListElement
            key={user.id}
            user={user}
          />
        )
      })}
    </>
  )
}

export default Users;
