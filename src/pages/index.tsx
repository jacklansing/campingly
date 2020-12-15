import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Box, Heading, Text } from 'theme-ui';
import FormBox from '../components/FormBox';
import RegisterForm from '../components/forms/RegisterForm';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePublicRoute } from '../utils/usePublicRoute';

const IndexPage = () => {
  usePublicRoute();
  return (
    <Layout pageTitle="Home">
      <Box
        sx={{
          display: 'grid',
          width: ['100%', null, null, null, '85%'],
          gridTemplateColumns: [
            '100%',
            null,
            '500px',
            null,
            '1fr 500px',
            '1fr 650px',
          ],
          justifyContent: 'center',
          gap: '.5rem',
          transition: 'all .222s ease-in',
        }}
      >
        <Box
          mt={[null, null, 1, 3, 5, 6]}
          mx={['auto', null, 'inherit']}
          sx={{ textAlign: ['center', null, null, null, 'left'] }}
        >
          <Heading as="h1" variant="headings.h1">
            Your campsite {<br />} <strong>Organized.</strong>
          </Heading>
          <Text sx={{ fontSize: [5, 5, 5, 6, null, null] }}>
            Track and manage gear.
          </Text>
        </Box>
        <FormBox
          header="Sign Up 🚀"
          width={['100%', '100%', '100%', '100%', '100%']}
        >
          <RegisterForm />
        </FormBox>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
