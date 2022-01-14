import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";
import { ApolloLink } from "@apollo/client";

import { GET_REPOSITORIES_OF_CURRENT_USER } from "./api/requests";

const GITHUB_BASE_URL = "https://api.github.com/graphql";

// Creating a configured HttpLink instance
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

// Creating the cache as the place where the data is managed in Apollo Client.
const cache = new InMemoryCache();

// Handling errors on application level
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // something here...
  }
  if (networkError) {
    // something here...
  }
});

// Merging httpLink and errorLink
const link = ApolloLink.from([errorLink, httpLink]);

// Initializing apollo client
const client = new ApolloClient({
  link,
  cache,
});

// Example of query
client.query({
  query: GET_REPOSITORIES_OF_CURRENT_USER,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
