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
            Your campsite {<br />} <strong>Organized.</strong>
          </Heading>
          <Text sx={{ fontSize: [5] }}>Track and manage gear.</Text>
        </Box>
        <FormBox header="Sign Up 🚀">
          <RegisterForm />
        </FormBox>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
