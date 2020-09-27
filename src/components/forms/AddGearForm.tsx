import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'theme-ui';
import {
  useAddGearMutation,
  useGetCategoriesQuery,
} from '../../generated/graphql';
import { SelectField, TextInputField } from '../utils/formUtils';
import { useRouter } from 'next/router';

const AddGearForm: React.FC = () => {
  const router = useRouter();
  const [{ data, fetching }] = useGetCategoriesQuery({
    variables: { campsiteId: 1 },
  });
  const [_, addGear] = useAddGearMutation();
  return (
    <Formik
      //   validationSchema={}
      initialValues={{ name: '', quantity: '', gearCategoryId: undefined }}
      onSubmit={async (values, actions) => {
        const response = await addGear({
          input: {
            name: values.name,
            quantity: parseInt(values.quantity),
            gearCategoryId: parseInt(values.gearCategoryId),
          },
        });
        if (response.error) {
          //TODO: Show general error
          console.error(response.error.message);
        } else if (response.data.addGear.gear.id) {
          // Success, change route to close modal.
          router.push(
            `/campsites/${router.query.id}`,
            `/campsites/${router.query.id}`,
            { shallow: true },
          );
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <SelectField
            name="gearCategoryId"
            label="Category"
            options={data && !fetching ? data.getCategories.gearCategories : []}
            formatOptionFn={(opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.category}
              </option>
            )}
          />
          <TextInputField
            label="Gear Label"
            name="name"
            placeholder="New gear label"
          />
          <TextInputField
            label="Amount Needed"
            name="quantity"
            placeholder="0"
            type="number"
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
            Add Gear
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddGearForm;
