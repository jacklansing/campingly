/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CampsiteRole, useInviteCamperMutation } from '../../generated/graphql';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';
import AddUserIcon from '../../assets/icons/add-user-icon.svg';
import { toErrorMap } from '../../utils/toErrorMap';

interface Props {}

const InviteCamperForm: React.FC<Props> = ({}) => {
  const [_, inviteCamper] = useInviteCamperMutation();
  const [success, setSuccess] = useState(false);
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
          setSuccess(false);
        } else if (response.data.inviteCamper.campsite) {
          values.email = '';
          setSuccess(true);
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
        </Form>
      )}
    </Formik>
  );
};
export default InviteCamperForm;
