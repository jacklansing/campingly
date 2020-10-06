import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useAddGearMutation,
  useGetCategoriesQuery,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { AddGearSchema } from '../../utils/validators/GearSchemas';
import Button from '../utils/Button';
import { SelectField, TextInputField } from '../utils/formUtils';

const AddGearForm: React.FC = () => {
  const router = useRouter();
  const campsiteId = +router.query.id;
  const [{ data, fetching }] = useGetCategoriesQuery({
    variables: { campsiteId: campsiteId },
  });
  const [_, addGear] = useAddGearMutation();
  return (
    <Formik
      validationSchema={AddGearSchema}
      enableReinitialize
      initialValues={{
        name: '',
        quantity: '',
        gearCategoryId: data?.getCategories?.gearCategories[0].id,
      }}
      onSubmit={async (values, actions) => {
        const response = await addGear({
          input: {
            name: values.name,
            quantity: +values.quantity,
            gearCategoryId: +values.gearCategoryId,
          },
        });
        if (response.data.addGear.errors) {
          actions.setErrors(toErrorMap(response.data.addGear.errors));
        } else if (response.data.addGear.gear.id) {
          // Success, change route to close modal.
          router.push(`/campsites/[id]`, `/campsites/${router.query.id}`, {
            shallow: true,
          });
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
          <TextInputField label="Amount Needed" name="quantity" type="number" />
          <Button
            variant="contained"
            type="submit"
            isLoading={props.isSubmitting || (!data && fetching)}
            isDisabled={props.isSubmitting || (!data && fetching)}
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
