import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Box, Heading, Link, Text } from 'theme-ui';
import FormBox from '../components/FormBox';
import LoginForm from '../components/forms/LoginForm';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePublicRoute } from '../utils/usePublicRoute';

const LoginPage: React.FC = () => {
  usePublicRoute();
  return (
    <Layout pageTitle="Login">
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
            Welcome <strong>back!</strong>
          </Heading>
          <Text ml={[2, null, null, null, null, 3]} sx={{ fontSize: [5] }}>
            Login to get started.
          </Text>
        </Box>
        <Box>
          <FormBox
            header="Log In 🐱‍💻"
            width={['100%', '100%', '85%', '100%', '100%']}
          >
            <LoginForm />
          </FormBox>
          <Text sx={{ fontSize: [4], textAlign: 'right' }} mt={4}>
            Forgot your password?
          </Text>
          <Link
            href="/forgot-password"
            sx={{
              display: 'block',
              color: 'dark',
              opacity: 0.8,
              textAlign: 'right',
            }}
            mt={2}
          >
            Click here to request a new one.
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(LoginPage);
