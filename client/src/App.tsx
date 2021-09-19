import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import TopPage from "pages";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/graphql'
})

const App: FC = () => {
  return (
    <ApolloProvider client={client} >
      <TopPage />
    </ApolloProvider>
  );
}
export default App;
