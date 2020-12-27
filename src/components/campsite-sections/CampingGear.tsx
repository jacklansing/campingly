/** @jsx jsx */
import { useRouter } from 'next/router';
import React from 'react';
import { Heading, jsx, Text } from 'theme-ui';
import { Gear, GetCampsiteQuery } from '../../generated/graphql';
import GearCategory from '../GearCategory';
import NextLink from 'next/link';

interface Props {
  campsiteData: GetCampsiteQuery;
}

const CampingGear: React.FC<Props> = ({ campsiteData }) => {
  const router = useRouter();
  return (
    <>
      <Heading as="h3" variant="headings.h3" mt={4}>
        Camping Gear
      </Heading>
      {campsiteData.getCampsite.gearCategories.length ? null : (
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
      {campsiteData.getCampsite.gearCategories.map((gc) => (
        <GearCategory
          key={gc.id}
          gearCategoryId={gc.id}
          campsiteId={campsiteData.getCampsite.id}
          category={gc.category}
          gear={gc.gear as Gear[]}
        />
      ))}
    </>
  );
};

export default CampingGear;
