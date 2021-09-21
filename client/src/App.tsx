import { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TopPage from 'pages/top';
import UserPage from 'pages/user';
import SignupPage from 'pages/signup';
import Header from 'components/Header';
import URI from 'constant';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI,
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
export default App;
