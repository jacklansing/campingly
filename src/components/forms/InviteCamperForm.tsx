/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { CampsiteRole, useInviteCamperMutation } from '../../generated/graphql';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';
import AddUserIcon from '../../assets/icons/add-user-icon.svg';
import { toErrorMap } from '../../utils/toErrorMap';

interface Props {}

const InviteCamperForm: React.FC<Props> = ({}) => {
  const [_, inviteCamper] = useInviteCamperMutation();

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values, actions) => {
        const response = await inviteCamper({
          input: {
            userEmail: values.email,
            // For now we'll default the role to Camper on any invite.
            role: CampsiteRole.Camper,
          },
        });
        if (response.data.inviteCamper.errors) {
          actions.setErrors(toErrorMap(response.data.inviteCamper.errors));
          toast('🛑 Something went wrong. Try sending the invite again.', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            type: 'error',
          });
        } else if (response.data.inviteCamper.campsite) {
          values.email = '';
          toast('🙌 Nice! Invite sent!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            type: 'success',
          });
        }
      }}
    >
      {(props) => (
        <Form
          onSubmit={props.handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: ['center', null, null, 'flex-start'],
            width: '100%',
          }}
        >
          <TextInputField
            label=""
            aria-label="enter email to invite someone to your campsite"
            name="email"
            type="email"
            placeholder="camper@email.com"
          />
          <Button
            variant="ico"
            type="submit"
            isLoading={props.isSubmitting}
            isDisabled={props.isSubmitting}
            mt={4}
            px={1}
            sx={{
              ml: 2,
            }}
          >
            <AddUserIcon />
          </Button>
          <ToastContainer />
        </Form>
      )}
    </Formik>
  );
};
export default InviteCamperForm;
