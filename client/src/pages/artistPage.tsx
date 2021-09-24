import { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ArtistsData, getArtistsQuery, Artist } from 'lib/artist';
import Artists from 'components/Artists';

const ArtistPage: FC = () => {
  const { loading, error, data } = useQuery<ArtistsData>(getArtistsQuery);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (data) {
      setArtists(data.artists);
    }
  }, [data]);

  if (loading) return <>Loading</>;
  if (error) return <>Error: {error.message}</>;

  return <Artists artists={artists} />;
};

export default ArtistPage;
