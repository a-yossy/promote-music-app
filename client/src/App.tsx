import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import TopPage from "pages";
import UserPage from "pages/user";
import SignupPage from "pages/signup";
import { URI } from "constant";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from "react-router-dom";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI
});

const App: FC = () => {
  return (
    <ApolloProvider client={client} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
