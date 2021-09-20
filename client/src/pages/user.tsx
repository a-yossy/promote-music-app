import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { User, getUserQueryById } from "lib/user";

const UserPage: FC =() => {
  const params = useParams();
  const userId = Number(params.id);
  const { loading, error, data } = useQuery(getUserQueryById, { variables: { id: userId } });
  const [user, setUser] = useState<User>();

  useEffect(() => {
    data && setUser(data.user);
  }, [data]);

  if (loading) return <>Loading</>
  if (error) return <>`Error ${error.message}`</>;

  return (
    <>
      <h1>{user?.name}</h1>
    </>
  )
};

export default UserPage;
