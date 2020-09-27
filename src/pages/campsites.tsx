import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Box } from 'theme-ui';
import CampsiteCard from '../components/CampsiteCard';
import Layout from '../components/Layout';
import { useGetAllCampsitesQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePrivateRoute } from '../utils/usePrivateRoute';

const Campsites: React.FC = () => {
  usePrivateRoute();
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
          data.allCampsites.map((campsite) => (
            <CampsiteCard
              name={campsite.name}
              startDate={campsite.startingDate}
              endDate={campsite.endingDate}
            />
          ))}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Campsites);
