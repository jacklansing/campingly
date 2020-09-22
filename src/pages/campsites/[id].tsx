/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { Heading, Image, jsx } from 'theme-ui';
import DateRange from '../../components/DateRange';

interface Props {}

const CampsitePage: React.FC<Props> = ({}) => {
  usePrivateRoute();
  return (
    <Layout pageTitle="Campsite">
      <Image
        alt="campsite"
        src="/assets/campsite-ground.svg"
        sx={{ maxWidth: [null, null, '33%'] }}
      />
      <Heading as="h1" variant="headings.h2" sx={{ textAlign: 'center' }}>
        Holmes Lake
      </Heading>
      <DateRange
        as="h2"
        variant="headings.h4"
        startDate="9/24"
        endDate="9/25"
        mt={3}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CampsitePage);
