/** @jsx jsx */
import { jsx, Image, Heading, Spinner } from 'theme-ui';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useCampsitePreviewQuery } from '../../generated/graphql';
import DateRange from '../../components/DateRange';
import { formatDate } from '../../utils/formatDate';
import InviteResponse from '../../components/forms/InviteResponse';

interface Props {}

const InvitePage: React.FC<Props> = ({}) => {
  const router = useRouter();
  const token = router.query.token as string;
  const [{ data, fetching }] = useCampsitePreviewQuery({
    pause: !token,
    variables: {
      inviteToken: token,
    },
  });

  if (!data || fetching) {
    return (
      <Layout pageTitle="Campsite Invitation">
        <Spinner
          size={100}
          mx="auto"
          my="auto"
          mt="15%"
          sx={{ display: 'block', verticalAlign: 'middle' }}
        />
      </Layout>
    );
  }

  const { name, startingDate, endingDate } = data.campsitePreview;

  return (
    <Layout pageTitle="Campsite Invitation">
      <Image
        sx={{ maxHeight: '200px', maxWidth: 'fit' }}
        src="/assets/campsite.svg"
        alt="campsite"
      />
      <Heading as="h1" variant="headings.h3" sx={{ textAlign: 'center' }}>
        {name}
      </Heading>
      <DateRange
        as="h4"
        variant="headings.h5"
        startDate={formatDate(startingDate)}
        endDate={formatDate(endingDate)}
        mt={2}
        mx="auto"
      />
      <Heading
        as="h2"
        variant="headings.h3"
        sx={{ mt: [5], textAlign: 'center', flex: '0 0 100%' }}
      >
        {`You've been invited to camp at ${name}!`}
      </Heading>
      <InviteResponse inviteToken={token} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(InvitePage);
