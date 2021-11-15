import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { URI } from 'constant';
import cache from 'cache';
import App from 'App';

const client = new ApolloClient({
  cache,
  uri: URI,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
