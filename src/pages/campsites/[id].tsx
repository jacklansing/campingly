/** @jsx jsx */
import { motion } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Heading, jsx, Spinner, Text } from 'theme-ui';
import CampsiteFab from '../../components/CampsiteFab';
import DateRange from '../../components/DateRange';
import GearCategory from '../../components/GearCategory';
import Layout from '../../components/Layout';
import AddGearModal from '../../components/modals/AddGearModal';
import CategoryRequiredModal from '../../components/modals/CategoryRequiredModal';
import NewCategoryModal from '../../components/modals/NewCategoryModal';
import VolunteerGearModal from '../../components/modals/VolunteerGearModal';
import { Gear, useGetCampsiteQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { formatDate } from '../../utils/formatDate';
import { usePrivateRoute } from '../../utils/usePrivateRoute';

const CampsitePage: React.FC = () => {
  usePrivateRoute();
  const router = useRouter();
  const campsiteId = +router.query.id;

  const [{ data, fetching }] = useGetCampsiteQuery({
    pause: !campsiteId,
    variables: { campsiteId: campsiteId },
  });

  useEffect(() => {
    // Helps prevent getting stuck when loading a campsite that
    // is not yours. E.g. upon switching accounts
    if (!fetching && !data) {
      router.push('/campsites');
    }
  }, [data]);

  if (fetching || !data) {
    return (
      <Layout pageTitle="Campsite">
        <Spinner
          size={100}
          mx="auto"
          my="auto"
          mt="15%"
          sx={{ display: 'block', verticalAlign: 'middle' }}
        />
      </Layout>
    );
  }
  return (
    <Layout pageTitle={`${data.getCampsite.name}`}>
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
        <Text
          mt={2}
          mb={5}
          px={2}
          sx={{ textAlign: 'center', maxWidth: '420px' }}
        >
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
