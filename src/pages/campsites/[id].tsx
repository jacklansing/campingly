/** @jsx jsx */
import { motion } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Heading, jsx, Spinner } from 'theme-ui';
import CampsiteFab from '../../components/CampsiteFab';
import DateRange from '../../components/DateRange';
import Layout from '../../components/Layout';
import AddGearModal from '../../components/modals/AddGearModal';
import CategoryRequiredModal from '../../components/modals/CategoryRequiredModal';
import NewCategoryModal from '../../components/modals/NewCategoryModal';
import VolunteerGearModal from '../../components/modals/VolunteerGearModal';
import { useGetCampsiteQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { formatDate } from '../../utils/formatDate';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { fadeInUp } from '../../utils/animations';
import CampsiteMenu from '../../components/CampsiteMenu';
import CampingGear from '../../components/campsite-sections/CampingGear';
import Members from '../../components/campsite-sections/Members';

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

    // Default section to show if none was provided
    if (router.query.section === undefined) {
      router.query.section = 'details';
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
        {/* Campsite Menu and router controlled sections */}
        <CampsiteMenu />
        {(!router.query.section || router.query.section === 'details') && (
          <>
            <CampsiteFab
              hasCategories={!!data.getCampsite.gearCategories.length}
            />
            <CampingGear campsiteData={data} />
          </>
        )}
        {router.query.section === 'members' && <Members campsiteData={data} />}
      </motion.div>
      {/* Router Controlled Modals */}
      <NewCategoryModal open={!!router.query.newCategory} />
      <AddGearModal open={!!router.query.addGear} />
      <CategoryRequiredModal open={!!router.query.categoryRequired} />
      <VolunteerGearModal open={!!router.query.volunteerGear} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(CampsitePage);
