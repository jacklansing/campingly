import { cacheExchange, Data } from '@urql/exchange-graphcache';
import { NextUrqlClientConfig } from 'next-urql';
import {
  CombinedError,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Operation,
} from 'urql';
import { MeDocument } from '../generated/graphql';
import { isServer } from './isServer';

// Prevents from needing to ts-ignore all the time
// when working with updateQuery
interface MuData extends Data {
  [key: string]: any;
}

export const createUrqlClient: NextUrqlClientConfig = (
  ssrExchange: any,
  ctx: any,
) => {
  let cookie = '';
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: 'include',
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: (result, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                return { __typename: 'User', me: null };
              });
            },
            login: (result: MuData, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                if (result.login.errors) return data;
                return {
                  __typename: 'User',
                  me: { ...result.login.user },
                };
              });
            },
            register: (result: MuData, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                return {
                  __typename: 'User',
                  me: { ...result.register.user },
                };
              });
            },
          },
        },
      }),
      ssrExchange,
      errorExchange({
        onError: (error: CombinedError, operation: Operation) => {
          console.log('An error!', error);
        },
      }),
      fetchExchange,
    ],
  };
};
