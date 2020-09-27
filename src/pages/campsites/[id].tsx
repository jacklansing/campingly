/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { Heading, Image, jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import DateRange from '../../components/DateRange';
import Fab from '../../components/Fab';
import GearCategory from '../../components/GearCategory';
import NewCategoryModal from '../../components/NewCategoryModal';

interface Props {}

const CampsitePage: React.FC<Props> = ({}) => {
  usePrivateRoute();
  const router = useRouter();
  return (
    <Layout pageTitle="Campsite">
      <Image
        alt="campsite"
        src="/assets/campsite-ground.svg"
        sx={{ maxWidth: [null, null, '33%'] }}
      />
      <Heading as="h1" variant="headings.h2">
        Holmes Lake
      </Heading>
      <DateRange
        as="h2"
        variant="headings.h4"
        startDate="9/24"
        endDate="9/25"
        mt={3}
      />
      <Heading as="h3" variant="headings.h3" mt={5}>
        Camping Gear
      </Heading>
      <GearCategory category="Food" />
      <GearCategory category="Food" />
      <Fab />
      <NewCategoryModal open={!!router.query.newCategory} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CampsitePage);
