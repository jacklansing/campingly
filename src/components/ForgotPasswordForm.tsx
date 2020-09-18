import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Text } from 'theme-ui';
import { useForgotPasswordMutation } from '../generated/graphql';
import { ForgotPasswordSchema } from '../utils/validators/UserSchemas';
import { TextInputField } from './utils/formUtils';

const RegisterForm: React.FC = () => {
  const [_, forgotPassword] = useForgotPasswordMutation();
  const [success, setSuccess] = useState(false);
  return (
    <Formik
      validationSchema={ForgotPasswordSchema}
      initialValues={{ email: '' }}
      onSubmit={async (values, _) => {
        console.log(values);
        const response = await forgotPassword({ email: values.email });
        console.log(response);
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
            disabled={props.isSubmitting}
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
