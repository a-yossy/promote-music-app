import { FC } from 'react';
import TopPage from 'pages/TopPage';
import UserPage from 'pages/UserPage';
import SignupPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import ArtistPage from 'pages/ArtistPage';
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
