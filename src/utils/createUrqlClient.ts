import { cacheExchange, Data } from '@urql/exchange-graphcache';
import { NextUrqlClientConfig } from 'next-urql';
import {
  CombinedError,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Operation,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import {
  AddGearMutationVariables,
  GearCategory,
  GetAllCampsitesDocument,
  GetCampsiteDocument,
  GetCategoriesDocument,
  MeDocument,
} from '../generated/graphql';
import { isServer } from './isServer';

import Router from 'next/router';

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
    requestPolicy: 'cache-first',
    fetchOptions: {
      credentials: 'include',
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          GetCategoriesResponse: (data) => data.id as string,
          GearVolunteer: (data) => `${data.userId}/${data.gearId}`,
        },
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
            addGear: (
              result: MuData,
              args: AddGearMutationVariables,
              cache,
              info,
            ) => {
              cache.updateQuery(
                {
                  query: GetCampsiteDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  if (!data) return null;
                  const gearCat = data.getCampsite.gearCategories.find(
                    (gc: GearCategory) => gc.id === args.input.gearCategoryId,
                  );
                  gearCat.gears.push({
                    __typename: 'Gear',
                    ...result.addGear.gear,
                    gearVolunteers: [],
                  });
                  return data;
                },
              );
            },
            createGearCategory: (
              result: MuData,
              args: AddGearMutationVariables,
              cache,
              info,
            ) => {
              cache.updateQuery(
                {
                  query: GetCampsiteDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  if (!data) return null;
                  data.getCampsite.gearCategories.push({
                    __typename: 'GearCategory',
                    ...result.createGearCategory.gearCategory,
                    gears: [],
                  });
                  return data;
                },
              );
              cache.updateQuery(
                {
                  query: GetCategoriesDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  if (!data) return null;
                  data.getCategories.gearCategories.push({
                    __typename: 'GearCategory',
                    ...result.createGearCategory.gearCategory,
                  });
                  return data;
                },
              );
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
