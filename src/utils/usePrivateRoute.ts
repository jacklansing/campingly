import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export const usePrivateRoute = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  console.log('called');
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/login?next=' + router.pathname);
    }
  }, []);
};
