import { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TopPage from 'pages/TopPage';
import UserPage from 'pages/UserPage';
import SignupPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import ArtistPage from 'pages/ArtistPage';
import Header from 'components/Header';
import { URI } from 'constant';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import getLoginUserName from 'lib/getLoginUserName';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI,
});

const App: FC = () => {
  const userName = getLoginUserName();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route
            path="signup"
            element={userName ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            path="login"
            element={userName ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="artists" element={<ArtistPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default App;
