import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Box } from 'theme-ui';
import FormBox from '../../components/FormBox';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';
import Layout from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { usePublicRoute } from '../../utils/usePublicRoute';

const ChangePasswordPage: React.FC = () => {
  usePublicRoute();
  const router = useRouter();
  return (
    <Layout pageTitle="Change Password">
      <Box
        mt={[2, null, null, null, 5]}
        sx={{
          width: ['100%', '90%', '90%', '60%', '500px'],
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FormBox header="New Password 🔐">
          <ResetPasswordForm token={router.query.token as string} />
        </FormBox>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePasswordPage);
