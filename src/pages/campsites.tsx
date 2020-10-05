/** @jsx jsx */
import { motion } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { jsx, Spinner } from 'theme-ui';
import CampsiteCard from '../components/CampsiteCard';
import Layout from '../components/Layout';
import CreateCampsiteModal from '../components/modals/CreateCampsiteModal';
import NewCampsiteFab from '../components/NewCampsiteFab';
import { useGetAllCampsitesQuery } from '../generated/graphql';
import { staggerChildren } from '../utils/animations';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePrivateRoute } from '../utils/usePrivateRoute';

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
      <motion.div
        variants={staggerChildren}
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
      </motion.div>
      <NewCampsiteFab />
      <CreateCampsiteModal open={!!router.query.createCampsite} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campsites);
