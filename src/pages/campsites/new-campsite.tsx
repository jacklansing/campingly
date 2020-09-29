import React from 'react';
import { Box, Heading, Button, Link, Text } from 'theme-ui';
import FormBox from '../../components/FormBox';
import NewCampsiteForm from '../../components/forms/NewCampsiteForm';
import Layout from '../../components/Layout';
import { usePrivateRoute } from '../../utils/usePrivateRoute';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

interface Props {}

const NewCampsitePage: React.FC<Props> = ({}) => {
  usePrivateRoute();
  return (
    <Layout pageTitle="Home">
      <Box
        sx={{
          display: 'grid',
          width: ['100%', null, null, null, '85%'],
          gridTemplateColumns: [
            '1fr',
            '1fr',
            '1fr',
            '1fr',
            '1fr 500px',
            '1fr 650px',
          ],
          justifyItems: ['center', null, null, null, 'normal'],
          gap: '1rem',
          transition: 'all .222s ease-in',
        }}
      >
        <Box mt={[null, null, 1, 3, 5, 6]}>
          <Heading as="h1" variant="headings.h1">
            Create a new campsite.
          </Heading>
          <Text sx={{ fontSize: [5] }}>
            Campsites allow you to track your camping gear, meeting locations,
            and more!
          </Text>
        </Box>
        <FormBox header="New Campsite">
          <NewCampsiteForm />
        </FormBox>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(NewCampsitePage);
