import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Text } from 'theme-ui';
import Button from '../utils/Button';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { ForgotPasswordSchema } from '../../utils/validators/UserSchemas';
import { TextInputField } from '../utils/formUtils';

const RegisterForm: React.FC = () => {
  const [_, forgotPassword] = useForgotPasswordMutation();
  const [success, setSuccess] = useState(false);
  return (
    <Formik
      validationSchema={ForgotPasswordSchema}
      initialValues={{ email: '' }}
      onSubmit={async (values, _) => {
        const response = await forgotPassword({ email: values.email });
        if (response.data.forgotPassword) {
          setSuccess(true);
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="Email Address"
            name="email"
            placeholder="you@example.com"
          />
          <Text
            variant="success"
            mt={1}
            ml={1}
            sx={{
              display: success ? 'block' : 'none',
              transition: 'all .222s ease',
              fontWeight: 500,
            }}
          >
            If the provided email address matches an account, you'll receive an
            email with the reset link shortly.
          </Text>
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
            Send Recovery Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
