import { FC, useState, useEffect } from "react";
import { usersQuery, User } from "lib/user";
import { useQuery } from "@apollo/client";

const TopPage: FC = () => {
  const { loading, error, data } = useQuery(usersQuery);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    data && setUsers(data.users)
  },[data]);

  if (loading) return <>"Loading"</>;
  if (error) return <>`Error ${error.message}`</>;
  
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
};

export default TopPage;
