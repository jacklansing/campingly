import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePrivateRoute } from '../utils/usePrivateRoute';

const PrivatePage: React.FC = () => {
  usePrivateRoute();
  return <Layout pageTitle="Prviate"></Layout>;
};

export default withUrqlClient(createUrqlClient)(PrivatePage);
