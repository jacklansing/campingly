import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'theme-ui';
import { useCreateGearCategoryMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { TextInputField } from './utils/formUtils';

const NewCategoryForm: React.FC = () => {
  const [_, createGearCategory] = useCreateGearCategoryMutation();
  return (
    <Formik
      //   validationSchema={}
      initialValues={{ category: '' }}
      onSubmit={async (values, actions) => {
        const response = await createGearCategory({
          campsiteId: 1,
          category: values.category,
        });
        if (response.data.createGearCategory.errors) {
          actions.setErrors(
            toErrorMap(response.data.createGearCategory.errors),
          );
        } else if (response.data.createGearCategory.gearCategory.id) {
          // Success, change route to close modal.
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <TextInputField
            label="Category Name"
            name="category"
            placeholder="Enter category name"
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
            Create Category
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewCategoryForm;
