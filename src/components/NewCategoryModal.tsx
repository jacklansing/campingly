import React from 'react';
import NewCategoryForm from './NewCategoryForm';
import ResponsiveModal from './utils/ResponsiveModal';

interface Props {
  open: boolean;
}

const NewCategoryModal: React.FC<Props> = ({ open }) => {
  return (
    <ResponsiveModal open={open}>
      <NewCategoryForm />
    </ResponsiveModal>
  );
};

export default NewCategoryModal;
