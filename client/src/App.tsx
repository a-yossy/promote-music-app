import { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TopPage from 'pages/topPage';
import UserPage from 'pages/userPage';
import SignupPage from 'pages/signupPage';
import LoginPage from 'pages/loginPage';
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

  return(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="signup" element={userName ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="login" element={userName ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
  )
};
export default App;
