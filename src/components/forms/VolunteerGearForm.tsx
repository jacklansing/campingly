import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../utils/Button';
import { useVolunteerGearMutation } from '../../generated/graphql';
import { TextInputField } from '../utils/formUtils';
import { useRouter } from 'next/router';
import { toErrorMap } from '../../utils/toErrorMap';

const VolunteerGearForm: React.FC = () => {
  const router = useRouter();
  const [, addGear] = useVolunteerGearMutation();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        gearId: +router.query.gearId,
        volunteerAmount: 0,
      }}
      onSubmit={async (values, actions) => {
        const response = await addGear({
          input: {
            gearId: values.gearId,
            volunteerAmount: values.volunteerAmount,
          },
        });
        if (response.data.volunteerGear.errors) {
          actions.setErrors(toErrorMap(response.data.volunteerGear.errors));
        } else if (response.data.volunteerGear.gearVolunteer.userId) {
          // Success, change route to close modal.
          router.push(`/campsites/[id]`, `/campsites/${router.query.id}`, {
            shallow: true,
          });
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="Volunteer how many?"
            name="volunteerAmount"
            type="number"
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
            Confirm
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VolunteerGearForm;
