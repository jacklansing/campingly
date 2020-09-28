import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'theme-ui';
import { useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { TextInputField } from '../utils/formUtils';

const RegisterForm: React.FC = () => {
  const [_, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ usernameOrEmail: '', password: '' }}
      onSubmit={async (values, actions) => {
        const response = await login({
          ...values,
        });
        if (response.data?.login.errors) {
          actions.setErrors(toErrorMap(response.data?.login.errors));
        } else {
          if (typeof router.query.next === 'string') {
            router.push(router.query.next);
          } else {
            router.push('/campsites');
          }
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="Username"
            name="usernameOrEmail"
            placeholder="Username or Email"
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
            disabled={props.isSubmitting}
            mt={4}
            px={5}
            sx={{
              display: 'block',
              marginLeft: 'auto',
            }}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
