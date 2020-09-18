import React from 'react';
import { Heading, Text, Box } from 'theme-ui';
import Layout from '../components/Layout';

interface Props {}

const Custom404: React.FC<Props> = ({}) => {
  return (
    <Layout pageTitle="404 Not Found">
      <Box
        mt={4}
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
        }}
      >
        <Heading as="h1" sx={{ display: 'inline' }}>
          404 |{' '}
        </Heading>
        <Text mt={2} ml={2} sx={{ display: 'inline' }}>
          Not Found
        </Text>
      </Box>
    </Layout>
  );
};

export default Custom404;
