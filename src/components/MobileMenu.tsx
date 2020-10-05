/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import AppMenuContent from './AppMenuContent';

const MobileMenu: React.FC = ({}) => {
  const router = useRouter();

  return (
    <Modal
      isOpen={!!router.query.mobileAppMenu}
      style={{
        content: {
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        },
      }}
    >
      <AppMenuContent />
    </Modal>
  );
};

export default MobileMenu;
