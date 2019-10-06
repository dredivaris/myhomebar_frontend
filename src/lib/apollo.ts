// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools';
// import * as Cookies from 'js-cookie';
import Cookies from 'universal-cookie';
import * as cookie from 'cookie';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// ----------------------------------------------------------------------------

export async function createClient(externalCookies): Promise<any> {
  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();
  // Create a HTTP client (both server/client). It takes the GraphQL
  // server from the `GRAPHQL` environment variable, which by default is
  // set to an external playground at https://graphqlhub.com/graphql
  // const httpLink = new HttpLink({
  //   credentials: "same-origin",
  //   uri: GRAPHQL,
  // });
  //
  // const httpLinkGraphene = new HttpLink({
  //   credentials: "same-origin",
  //   uri: GRAPHENE,
  // });
  let token: string | null | undefined;
  let cookies = new Cookies();

  try {

    if (!token) {
      token = cookies.get('homebarToken');
      if (token === undefined) {
        const cookieList = cookie.parse(externalCookies);
        token = cookieList.homebarToken;
      }
    }
  } catch (e) {
  }

  // setup schema stitching
  const getRemoteExecutableSchema = async (uri: string, creds: string) => {
    const httpLink = new HttpLink({
      uri,
      credentials: creds,
      headers: {
        'content-type': 'application/json',
        'authorization': token ? `JWT ${token}` : '',
      }});
    const remoteSchema = await introspectSchema(httpLink);
    return makeRemoteExecutableSchema({ schema: remoteSchema, link: httpLink });
  };
  const executableSchema1 = await getRemoteExecutableSchema(GRAPHQL, 'same-origin');
  const executableSchema2 = await getRemoteExecutableSchema(GRAPHENE, 'same-origin');

  const newSchema = mergeSchemas({
    schemas: [executableSchema1, executableSchema2],
  });

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if (!SERVER) {
    console.log('not in server.. in browser');
    cache.restore((window as any).__APOLLO_STATE__);
  }

  const link = new SchemaLink({ schema: newSchema });
  // const httpLink = createHttpLink({ headers, });
  // const setAuthorizationLink = setContext((request, previousContext) => ({
  //   headers: {authorization: token ? `JWT ${ token }` : 'blah' }
  // }));

  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests

  const c = new ApolloClient({
    cache,
    link: ApolloLink.from([
      link,
      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),
    ]),
    // On the server, enable SSR mode
    ssrMode: SERVER,
  });

  return c;
}
