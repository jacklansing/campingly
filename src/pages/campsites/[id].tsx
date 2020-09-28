/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { Heading, Image, jsx, Spinner } from 'theme-ui';
import { useRouter } from 'next/router';
import DateRange from '../../components/DateRange';
import Fab from '../../components/Fab';
import GearCategory from '../../components/GearCategory';
import NewCategoryModal from '../../components/modals/NewCategoryModal';
import AddGearModal from '../../components/modals/AddGearModal';
import { Gear, useGetCampsiteQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/formatDate';

interface Props {}

const CampsitePage: React.FC<Props> = ({}) => {
  usePrivateRoute();
  const router = useRouter();
  const campsiteId = +router.query.id;
  const [{ data, fetching }] = useGetCampsiteQuery({
    pause: !campsiteId,
    variables: { campsiteId: campsiteId },
  });

  if (fetching) {
    return <Spinner />;
  }
  return (
    <Layout pageTitle="Campsite">
      <Image
        alt="campsite"
        src="/assets/campsite-ground.svg"
        sx={{ maxWidth: [null, null, '33%'] }}
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
      {data.getCampsite.gearCategories.map((gc) => (
        <GearCategory
          key={gc.id}
          category={gc.category}
          gear={gc.gears as Gear[]}
        />
      ))}
      <Fab />
      <NewCategoryModal open={!!router.query.newCategory} />
      <AddGearModal open={!!router.query.addGear} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(CampsitePage);
