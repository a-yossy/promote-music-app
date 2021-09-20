import { FC } from "react";
import { Artist } from "lib/artist";
import ArtistListElement from "components/ArtistListElement";

type ArtistsProps = {
  artists: Artist[]
};

const Artists: FC<ArtistsProps> = ({ artists }) => {
  return (
    <>
      {artists.map((artist) => {
        return (
          <ArtistListElement
            key={artist.id}
            artist={artist}
          />
        )
      })}
    </>
  )
};

export default Artists;
