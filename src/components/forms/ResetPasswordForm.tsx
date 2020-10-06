import { Form, Formik } from 'formik';
import React from 'react';
import { useChangePasswordMutation } from '../../generated/graphql';
import { PasswordResetSchema } from '../../utils/validators/UserSchemas';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [_, changePassword] = useChangePasswordMutation();

  return (
    <Formik
      validationSchema={PasswordResetSchema}
      initialValues={{ password: '', passwordConfirm: '' }}
      onSubmit={async (values, _) => {
        await changePassword({
          newPassword: values.password,
          token,
        });
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="New Password"
            name="password"
            placeholder="Enter new password"
            type="password"
          />
          <TextInputField
            label="Confirm New Password"
            name="passwordConfirm"
            placeholder="Enter new password"
            type="password"
          />
          <Button
            variant="contained"
            type="submit"
            isLoading={props.isSubmitting}
            isDisabled={props.isSubmitting}
            mt={4}
            px={5}
            sx={{
              display: 'block',
              marginLeft: 'auto',
            }}
          >
            Change Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
