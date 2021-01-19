/** @jsx jsx */
import { Box, Heading, Text, jsx } from 'theme-ui';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import Layout from '../../components/Layout';

import RegisterForm from '../../components/forms/RegisterForm';
import FormBox from '../../components/FormBox';

interface Props {}

const RegisterPage: React.FC<Props> = ({}) => {
  return (
    <Layout pageTitle="Campsite Invitation">
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
          gap: [1, null, null, 5],
          transition: 'all .222s ease-in',
        }}
      >
        <Box
          mt={[null, null, 1, 3, 5, 6]}
          mx={['auto', null, 'inherit']}
          sx={{ textAlign: ['center', null, null, null, 'left'] }}
        >
          <Heading as="h1" variant="headings.h1">
            Welcome to Campingly!
          </Heading>
          <Text sx={{ fontSize: [4, 4, 4, 5, null, null], mt: [2] }}>
            You'll need to register before you can join a campsite.
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

export default withUrqlClient(createUrqlClient)(RegisterPage);
