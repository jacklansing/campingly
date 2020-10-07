import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreateCampsiteMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { NewCampsiteSchema } from '../../utils/validators/CampsiteSchema';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';

const NewCampsiteForm: React.FC = () => {
  const [_, createCampsite] = useCreateCampsiteMutation();
  const router = useRouter();
  return (
    <Formik
      validationSchema={NewCampsiteSchema}
      initialValues={{
        name: '',
        startingDate: undefined,
        endingDate: undefined,
      }}
      onSubmit={async (values, actions) => {
        const response = await createCampsite({
          input: {
            ...values,
          },
        });
        if (response.data?.createCampsite.errors) {
          actions.setErrors(toErrorMap(response.data?.createCampsite.errors));
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
            label="Name"
            name="name"
            placeholder="Campsite name"
          />
          <TextInputField label="Start Date" name="startingDate" type="Date" />
          <TextInputField label="End Date" name="endingDate" type="Date" />
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
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewCampsiteForm;
