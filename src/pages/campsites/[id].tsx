/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { Heading, Image, jsx, Spinner, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import DateRange from '../../components/DateRange';
import CampsiteFab from '../../components/CampsiteFab';
import GearCategory from '../../components/GearCategory';
import NewCategoryModal from '../../components/modals/NewCategoryModal';
import AddGearModal from '../../components/modals/AddGearModal';
import { Gear, useGetCampsiteQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/formatDate';
import CategoryRequiredModal from '../../components/modals/CategoryRequiredModal';
import NextLink from 'next/link';
import VolunteerGearModal from '../../components/modals/VolunteerGearModal';
import { motion } from 'framer-motion';

const CampsitePage: React.FC = ({}) => {
  usePrivateRoute();
  const router = useRouter();
  const campsiteId = +router.query.id;

  const [{ data, fetching }] = useGetCampsiteQuery({
    pause: !campsiteId,
    variables: { campsiteId: campsiteId },
  });

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
    <Layout pageTitle="Campsite">
      <motion.img
        alt="campsite"
        src="/assets/campsite-ground.svg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        sx={{ maxWidth: ['100%', '100%', '33%'], height: 'auto' }}
      />
      <Heading as="h1" variant="headings.h2">
        {data.getCampsite.name}
      </Heading>
      <DateRange
        as="h2"
        variant="headings.h4"
        startDate={formatDate(data.getCampsite.startingDate)}
        endDate={formatDate(data.getCampsite.endingDate)}
        mt={3}
      />
      <Heading as="h3" variant="headings.h3" mt={5}>
        Camping Gear
      </Heading>
      {data.getCampsite.gearCategories.length ? null : (
        <Text mt={2} mb={5} px={2} sx={{ textAlign: 'center' }}>
          Looks like there isn't any camping gear yet!{' '}
          <NextLink
            href="/campsites/[id]/?newCategory=true"
            as={`/campsites/${router.query.id}`}
            shallow={true}
          >
            Click here
          </NextLink>{' '}
          to start creating categories, or click on the Backpack icon.
        </Text>
      )}
      {data.getCampsite.gearCategories.map((gc) => (
        <GearCategory
          key={gc.id}
          category={gc.category}
          gear={gc.gears as Gear[]}
        />
      ))}
      <CampsiteFab hasCategories={!!data.getCampsite.gearCategories.length} />
      <NewCategoryModal open={!!router.query.newCategory} />
      <AddGearModal open={!!router.query.addGear} />
      <CategoryRequiredModal open={!!router.query.categoryRequired} />
      <VolunteerGearModal open={!!router.query.volunteerGear} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(CampsitePage);
