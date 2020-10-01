import React from 'react';
import VolunteerGearForm from '../forms/VolunteerGearForm';
import ResponsiveModal from '../utils/ResponsiveModal';

interface Props {
  open: boolean;
}

const VolunteerGearModal: React.FC<Props> = ({ open }) => {
  return (
    <ResponsiveModal open={open}>
      <VolunteerGearForm />
    </ResponsiveModal>
  );
};

export default VolunteerGearModal;
