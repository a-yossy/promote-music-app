import { FC } from "react";
import { useParams } from "react-router-dom";

const UserPage: FC =() => {
  const params = useParams();
  const userId = params.id;
  return (
    <>
      <h1>{userId}</h1>
    </>
  )
};

export default UserPage;
