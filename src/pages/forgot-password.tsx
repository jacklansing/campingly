import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Box } from 'theme-ui';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import FormBox from '../components/FormBox';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePublicRoute } from '../utils/usePublicRoute';

const ForgotPasswordPage: React.FC = ({}) => {
  usePublicRoute();

  return (
    <Layout pageTitle="Forgot Password">
      <Box
        mt={[2, null, null, null, 5]}
        sx={{
          width: ['100%', '90%', '90%', '60%', '500px'],
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FormBox
          header="Recover Password 📧"
          width={['100%', '100%', '85%', '100%', '100%']}
        >
          <ForgotPasswordForm />
        </FormBox>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPasswordPage);
