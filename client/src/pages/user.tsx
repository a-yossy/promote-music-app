import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getUserByIdQuery } from "lib/user";
import { Artist } from "lib/artist";
import Artists from "components/Artists";

const UserPage: FC =() => {
  const params = useParams();
  const userId = Number(params.id);
  const { loading, error, data } = useQuery(getUserByIdQuery, { variables: { id: userId } });
  const [userName, setUserName] = useState<String>("");
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (data) {
      setUserName(data.user.name);
      setArtists(data.user.artists);
    }
  }, [data]);

  if (loading) return <>Loading</>
  if (error) return <>`Error ${error.message}`</>;

  return (
    <>
      <h1>{userName}</h1>
      <Artists
        artists={artists}
      />
    </>
  )
};

export default UserPage;
