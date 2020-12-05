import { cacheExchange, Data } from '@urql/exchange-graphcache';
import { NextUrqlClientConfig } from 'next-urql';
import Router from 'next/router';
import { dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { GetAllCampsitesDocument, MeDocument } from '../generated/graphql';
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
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    requestPolicy: 'cache-first',
    fetchOptions: () => {
      let cookie = '';
      let csid = '';
      if (isServer()) {
        cookie = ctx?.req?.headers?.cookie;
        csid = ctx?.query?.id;
      } else {
        csid = Router.router.query.id as string;
      }
      return {
        credentials: 'include',
        headers: cookie
          ? {
              cookie,
              csid,
            }
          : { csid },
      };
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          Gear: (data) => data.id as string,
          GearVolunteer: (data) => data.userId as string,
        },
        updates: {
          Mutation: {
            logout: (result, args, cache, info) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                return { __typename: 'User', me: null };
              });
              // Removes cached Campsite, Campsite Info, etc. on Logout
              cache.invalidate('Query');
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
            createCampsite: (result: MuData, args, cache, info) => {
              cache.updateQuery(
                { query: GetAllCampsitesDocument },
                (data: MuData) => {
                  if (result.createCampsite.campsite === null) return data;
                  data.allCampsites.push({
                    __typename: 'Campsite',
                    ...result.createCampsite.campsite,
                  });
                  return data;
                },
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
