/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import {
  InviteStatus,
  useInviteResponseMutation,
  useMeQuery,
} from '../../generated/graphql';
import Button from '../utils/Button';
import { useRouter } from 'next/router';

interface Props {
  inviteToken: string;
}

const InviteResponse: React.FC<Props> = ({ inviteToken }) => {
  const [_, inviteResponse] = useInviteResponseMutation();
  const [{ data: meData }, __] = useMeQuery();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ status: InviteStatus.Accepted }}
      onSubmit={async (values, actions) => {
        if (values.status === InviteStatus.Accepted) {
          // If we're not logged in, we need to have the user register or login first.
          if (!meData.me && router.query.existing === '0') {
            router.push(
              `/invite/register?next=/invite?token=${router.query.token}&existing=1`,
            );
          }

          if (!meData.me && router.query.existing === '1') {
            router.push(
              `/login?next=/invite?token=${router.query.token}&existing=1`,
            );
          }

          // Then we can make an attempt to join the campsite.
          if (meData.me) {
            const response = await inviteResponse({
              input: {
                ...values,
                token: inviteToken,
              },
            });

            if (response.data.inviteResponse.errors) {
              toast('🛑 Something went wrong. Please try again.', {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                type: 'error',
              });
            } else {
              router.push('/campsites');
            }
          }
        } else if (values.status === InviteStatus.Rejected) {
          // Otherwise, we are rejecting the invite
          await inviteResponse({
            input: {
              ...values,
              token: inviteToken,
            },
          });
          router.push('/');
        }
      }}
    >
      {(props) => (
        <Form
          sx={{
            display: 'grid',
            gridTemplateColumns: ['200px', null, '200px 200px'],
            justifyItems: 'center',
            gap: [4, null, 0],
            width: 'fit-content',
            mt: 4,
            mx: 'auto',
          }}
        >
          <Button
            variant="contained"
            type="submit"
            px={3}
            isLoading={props.isSubmitting}
            isDisabled={props.isSubmitting}
            onClick={() => (props.values.status = InviteStatus.Accepted)}
          >
            Join Campsite
          </Button>
          <Button
            variant="contained"
            sx={{
              bg: 'darkred',
              opacity: 0.6,
              px: 3,
              '&:hover': {
                opacity: 1,
                bg: 'darkred',
              },
            }}
            type="submit"
            isLoading={props.isSubmitting}
            isDisabled={props.isSubmitting}
            onClick={() => (props.values.status = InviteStatus.Rejected)}
          >
            Reject Invitation
          </Button>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
};

export default InviteResponse;
