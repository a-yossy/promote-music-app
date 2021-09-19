import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import TopPage from "pages";
import { URI } from "constant";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI
});

const App: FC = () => {
  return (
    <ApolloProvider client={client} >
      <TopPage />
    </ApolloProvider>
  );
}
export default App;
