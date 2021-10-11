import { FC } from 'react';
import TopPage from 'pages/topPage';
import UserPage from 'pages/userPage';
import SignupPage from 'pages/signupPage';
import LoginPage from 'pages/loginPage';
import ArtistPage from 'pages/artistPage';
import Header from 'components/Header';
import { Route, Routes, Navigate } from 'react-router';

const App: FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="user/:name" element={<UserPage />} />
      <Route path="artists" element={<ArtistPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);
export default App;
