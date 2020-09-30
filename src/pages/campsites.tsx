import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Button } from 'theme-ui';
import CampsiteCard from '../components/CampsiteCard';
import Layout from '../components/Layout';
import CreateCampsiteModal from '../components/modals/CreateCampsiteModal';
import { useGetAllCampsitesQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePrivateRoute } from '../utils/usePrivateRoute';

const Campsites: React.FC = () => {
  usePrivateRoute();
  const router = useRouter();
  const [{ data, fetching }] = useGetAllCampsitesQuery();
  return (
    <Layout pageTitle="Campsites">
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
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
      </Box>
      <Button
        mt={4}
        onClick={() =>
          router.push(`/campsites?createCampsite=true`, `/campsites`, {
            shallow: true,
          })
        }
      >
        New Campsite
      </Button>
      <CreateCampsiteModal open={!!router.query.createCampsite} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campsites);
