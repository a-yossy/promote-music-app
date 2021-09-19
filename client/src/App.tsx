import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import TopPage from "pages";
import { uri } from "constant";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uri
});

const App: FC = () => {
  return (
    <ApolloProvider client={client} >
      <TopPage />
    </ApolloProvider>
  );
}
export default App;
