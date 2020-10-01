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
  MutationVolunteerGearArgs,
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
          GetCategoriesResponse: (data) => data.id as string,
          GearVolunteer: (data) => `${data.userId}/${data.gearId}`,
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
                    userHasVolunteered: false,
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
            createCampsite: (result: MuData, args, cache, info) => {
              cache.updateQuery(
                { query: GetAllCampsitesDocument },
                (data: MuData) => {
                  data.allCampsites.push({
                    __typename: 'Campsite',
                    ...result.createCampsite.campsite,
                  });
                  return data;
                },
              );
            },
            deleteGear: (result: MuData, args, cache, info) => {
              cache.updateQuery(
                {
                  query: GetCampsiteDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  const categoryIndex = data.getCampsite.gearCategories.findIndex(
                    (gc) => gc.id === args.gearCategoryId,
                  );
                  const deletedIndex = data.getCampsite.gearCategories[
                    categoryIndex
                  ].gears.findIndex((gear) => gear.id === args.gearId);

                  data.getCampsite.gearCategories[categoryIndex].gears.splice(
                    deletedIndex,
                    1,
                  );

                  return data;
                },
              );
            },
            volunteerGear: (
              result: MuData,
              args: MutationVolunteerGearArgs,
              cache,
              info,
            ) => {
              cache.updateQuery(
                {
                  query: GetCampsiteDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  // Locate volunteer array for the gear and push new result in
                  const gearCategoryIndex = data.getCampsite.gearCategories.findIndex(
                    (gc) =>
                      gc.gears.find((gear) => gear.id === args.input.gearId),
                  );

                  const gearIndex = data.getCampsite.gearCategories[
                    gearCategoryIndex
                  ].gears.findIndex((gear) => gear.id === args.input.gearId);

                  // Add volunteer
                  data.getCampsite.gearCategories[gearCategoryIndex].gears[
                    gearIndex
                  ].gearVolunteers.push({
                    ...result.volunteerGear.gearVolunteer,
                  });
                  // Set userHasVolunteered status back to false
                  data.getCampsite.gearCategories[gearCategoryIndex].gears[
                    gearIndex
                  ].userHasVolunteered = true;

                  return data;
                },
              );
            },
            undoVolunteerGear: (result: MuData, args, cache, info) => {
              cache.updateQuery(
                {
                  query: GetCampsiteDocument,
                  variables: { campsiteId: +Router.router.query.id },
                },
                (data: MuData) => {
                  const currentUser: any = cache.readQuery({
                    query: MeDocument,
                  });
                  console.log(data);
                  // Locate volunteer array for the gear and delete volunteer
                  const categoryIndex = data.getCampsite.gearCategories.findIndex(
                    (gc) => gc.gears.find((g) => g.id === args.gearId),
                  );

                  const gearIndex = data.getCampsite.gearCategories[
                    categoryIndex
                  ].gears.findIndex((gear) => gear.id === args.gearId);

                  const volunteerIndex = data.getCampsite.gearCategories[
                    categoryIndex
                  ].gears[gearIndex].gearVolunteers.findIndex(
                    (vol) => vol.userId === currentUser.me.id,
                  );

                  // Remove volunteer
                  data.getCampsite.gearCategories[categoryIndex].gears[
                    gearIndex
                  ].gearVolunteers.splice(volunteerIndex, 1);
                  // Set userHasVolunteered status back to false
                  data.getCampsite.gearCategories[categoryIndex].gears[
                    gearIndex
                  ].userHasVolunteered = false;

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
