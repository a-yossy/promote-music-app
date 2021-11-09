import rerender from 'react-test-renderer';
import ArtistListElement from 'components/ArtistListElement';

it('<ArtistListElement artist={{ id: 1, name: "artist" }} /> should render artist', () => {
  const tree = rerender
    .create(<ArtistListElement artist={{ id: 1, name: 'artist' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
