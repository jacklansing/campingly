import { Form, Formik } from 'formik';
import React from 'react';
import { useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { RegisterSchema } from '../../utils/validators/UserSchemas';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';

const RegisterForm: React.FC = () => {
  const [_, register] = useRegisterMutation();
  return (
    <Formik
      validationSchema={RegisterSchema}
      initialValues={{ username: '', email: '', password: '' }}
      onSubmit={async (values, actions) => {
        const response = await register({ input: { ...values } });
        if (response.data.register.errors) {
          actions.setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data.register.user) {
          // Success, push to next page.
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="Username"
            name="username"
            placeholder="Enter your username"
          />
          <TextInputField
            label="Email Address"
            name="email"
            placeholder="you@example.com"
          />
          <TextInputField
            label="Password"
            name="password"
            placeholder="Enter your password"
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
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
