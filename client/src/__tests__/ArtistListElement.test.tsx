import rerender from 'react-test-renderer';
import ArtistListElement from 'components/ArtistListElement';

it('render correcyly', () => {
  const tree = rerender
    .create(<ArtistListElement artist={{ id: 1, name: 'artist' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
