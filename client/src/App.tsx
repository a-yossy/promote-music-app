import { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TopPage from 'pages/top';
import UserPage from 'pages/user';
import SignupPage from 'pages/signup';
import LoginPage from 'pages/login';
import SignoutPage from 'pages/signoutPage';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signout" element={<SignoutPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
export default App;
