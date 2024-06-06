import "@/styles/globals.css";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';

const GRAPHQL_HTTP_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT ?? "http://localhost:4000/"


let apolloClient: ApolloClient<NormalizedCacheObject | null>

const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    chat_room: {
      fields: {
        chats: {
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

const httpLink = new HttpLink({
  fetch,
  uri: GRAPHQL_HTTP_ENDPOINT,
})

apolloClient = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([httpLink]),
  cache,
})
function App({ Component, pageProps }: AppProps) {
  return  (
    <ApolloProvider client={apolloClient}> 
      <Component {...pageProps} />
    </ApolloProvider>)
}


export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
