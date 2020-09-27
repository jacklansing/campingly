import React from 'react';
import AddGearForm from '../forms/AddGearForm';
import ResponsiveModal from '../utils/ResponsiveModal';

interface Props {
  open: boolean;
}

const AddGearModal: React.FC<Props> = ({ open }) => {
  return (
    <ResponsiveModal open={open}>
      <AddGearForm />
    </ResponsiveModal>
  );
};

export default AddGearModal;
