/** @jsx jsx */
import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { Box, Heading, Image, jsx } from 'theme-ui';

import ArrowIcon from '../../assets/icons/arrow-icon.svg';

interface Props {}

const DateBox = ({ children }) => (
  <Box
    as="span"
    px={3}
    py={'.444rem'}
    sx={{ backgroundColor: 'primary', borderRadius: 1, color: 'white' }}
  >
    {children}
  </Box>
);

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
      <Heading
        as="h2"
        variant="headings.h4"
        mt={3}
        sx={{
          textAlign: 'center',
          fontWeight: 'body',
          display: 'flex',
          flexFlow: 'row no-wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '200px',
        }}
      >
        <DateBox>9/24</DateBox>{' '}
        <ArrowIcon
          sx={{
            height: '1.333rem',
            width: '1.333rem',
          }}
        />{' '}
        <DateBox>9/25</DateBox>
      </Heading>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CampsitePage);
