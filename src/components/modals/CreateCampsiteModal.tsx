import React from 'react';
import ResponsiveModal from '../utils/ResponsiveModal';
import NewCampsiteForm from '../forms/NewCampsiteForm';
import { Heading } from 'theme-ui';

interface Props {
  open: boolean;
}

const CreateCampsiteModal: React.FC<Props> = ({ open }) => {
  return (
    <ResponsiveModal open={open}>
      <Heading as="h2" variant="headings.h3">
        Create New Campsite
      </Heading>
      <NewCampsiteForm />
    </ResponsiveModal>
  );
};

export default CreateCampsiteModal;
