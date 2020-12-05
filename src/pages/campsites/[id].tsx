/** @jsx jsx */
import { motion } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
import { fadeInUp } from '../../utils/animations';

const CampsitePage: React.FC = () => {
  usePrivateRoute();
  const router = useRouter();
  const campsiteId = router.query.id as string;

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
      {/* Temporary layout fix with this div while deciding what to do on the whole. */}
      <motion.div
        variants={fadeInUp}
        sx={{
          display: 'flex',
          flexFlow: 'column wrap',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 5,
        }}
      >
        <Image
          alt="campsite"
          src="/assets/campsite-ground.svg"
          width={400}
          height={300}
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
            gearCategoryId={gc.id}
            campsiteId={data.getCampsite.id}
            category={gc.category}
            gear={gc.gear as Gear[]}
          />
        ))}
      </motion.div>
      <CampsiteFab hasCategories={!!data.getCampsite.gearCategories.length} />
      <NewCategoryModal open={!!router.query.newCategory} />
      <AddGearModal open={!!router.query.addGear} />
      <CategoryRequiredModal open={!!router.query.categoryRequired} />
      <VolunteerGearModal open={!!router.query.volunteerGear} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(CampsitePage);
