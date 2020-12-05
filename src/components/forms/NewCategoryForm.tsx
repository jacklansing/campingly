import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreateGearCategoryMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { NewGearCategorySchema } from '../../utils/validators/GearCategorySchema';
import Button from '../utils/Button';
import { TextInputField } from '../utils/formUtils';

const NewCategoryForm: React.FC = () => {
  const [_, createGearCategory] = useCreateGearCategoryMutation();
  const router = useRouter();
  const campsiteId = router.query.id as string;
  return (
    <Formik
      validationSchema={NewGearCategorySchema}
      initialValues={{ category: '' }}
      onSubmit={async (values, actions) => {
        const response = await createGearCategory({
          input: {
            campsiteId: campsiteId,
            category: values.category,
          },
        });
        if (response.data.createGearCategory.errors) {
          actions.setErrors(
            toErrorMap(response.data.createGearCategory.errors),
          );
        } else if (response.data.createGearCategory.campsite) {
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
            label="Category Name"
            name="category"
            placeholder="Enter category name"
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
            Create Category
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewCategoryForm;
