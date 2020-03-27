import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';


const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = () => split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" &&
      definition.operation === "subscription";
  },
  wsLink,
  link
);

const gqClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: splitLink()
});

export default gqClient;
