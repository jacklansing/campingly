/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, jsx, Spinner, Text } from 'theme-ui';
import CampsiteCard from '../../components/CampsiteCard';
import Layout from '../../components/Layout';
import CreateCampsiteModal from '../../components/modals/CreateCampsiteModal';
import NewCampsiteFab from '../../components/NewCampsiteFab';
import StaggerChildren from '../../components/utils/StaggerChildren';
import { useGetAllCampsitesQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';

const Campsites: React.FC = () => {
  usePrivateRoute();
  const router = useRouter();
  const [{ data, fetching }] = useGetAllCampsitesQuery();

  if (fetching || !data) {
    return (
      <Layout pageTitle="Campsite">
        <Spinner
          size={100}
          mx="auto"
          my="auto"
          mt="50%"
          sx={{ display: 'block', verticalAlign: 'middle' }}
        />
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Campsites">
      <StaggerChildren
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignSelf: ['center', null, null, 'start'],
          alignItems: 'center',
          justifyContent: ['center', 'center', 'center', 'center', 'start'],
        }}
      >
        {!fetching &&
          data &&
          data.allCampsites.map((campsite) => (
            <CampsiteCard
              key={campsite.id}
              id={campsite.id}
              name={campsite.name}
              startDate={campsite.startingDate}
              endDate={campsite.endingDate}
            />
          ))}
      </StaggerChildren>
      {!fetching && data && data.allCampsites.length === 0 ? (
        <Box mr="auto" px={[2, 3, 4]} py={1} sx={{ maxWidth: '500px' }}>
          <Text
            sx={{
              fontSize: 4,
            }}
          >
            You don't have any campsites, yet!
          </Text>
          <Text mt={2}>
            Click on the plus icon to get started creating one, or you can{' '}
            <Link href="/campsites/?createCampsite=true" as="/campsites">
              click here
            </Link>{' '}
            to create your first.
          </Text>
        </Box>
      ) : null}
      <NewCampsiteFab />
      <CreateCampsiteModal open={!!router.query.createCampsite} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campsites);
