import { FC } from "react";
import { User } from "lib/user"

type UsersProps = {
  users: User[]
}

const Users: FC<UsersProps> =({ users }) => {
  return (
    <>
      {users.map((user) => {
        return(
          <div key={user.id}>
            {user.name}
          </div>
        )
      })}
    </>
  )
}

export default Users;
