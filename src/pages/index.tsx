import Layout from '../components/Layout';
import { Box, Heading, Text, Button, Link } from 'theme-ui';
import RegisterForm from '../components/forms/RegisterForm';
import React from 'react';
import FormBox from '../components/FormBox';
import { withUrqlClient } from 'next-urql';
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
          <Text sx={{ fontSize: [5] }}>Collect and manage gear.</Text>
          <Button mt={3} variant="contained" py={2} px={5}>
            Sign Up Now
          </Button>
          <Link
            href="#"
            sx={{
              display: 'block',
              color: 'dark',
              opacity: 0.8,
            }}
            mt={2}
            ml={12}
          >
            Click here to learn more
          </Link>
        </Box>
        <FormBox header="Sign Up 🚀">
          <RegisterForm />
        </FormBox>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
