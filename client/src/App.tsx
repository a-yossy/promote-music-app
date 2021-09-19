import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import TopPage from "pages";
import { client } from "constant";

const App: FC = () => {
  return (
    <ApolloProvider client={client} >
      <TopPage />
    </ApolloProvider>
  );
}
export default App;
