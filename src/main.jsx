import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import "../src/assets/css/main.css";
const base = import.meta.env.BASE_URL

const token = import.meta.env.VITE_MTG_JSON_TOKEN;

const httpLink = createHttpLink({
  uri: "https://graphql.mtgjson.com/",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter basename={base}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
