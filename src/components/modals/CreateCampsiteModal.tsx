import React from 'react';
import { Heading } from 'theme-ui';
import NewCampsiteForm from '../forms/NewCampsiteForm';
import ResponsiveModal from '../utils/ResponsiveModal';

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
