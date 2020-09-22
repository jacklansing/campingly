import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Box } from 'theme-ui';
import CampsiteCard from '../components/CampsiteCard';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePrivateRoute } from '../utils/usePrivateRoute';

const Campsites: React.FC = () => {
  usePrivateRoute();
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
        <CampsiteCard />
        <CampsiteCard />
        <CampsiteCard />
        <CampsiteCard />
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Campsites);
