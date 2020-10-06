/** @jsx jsx */
import { useRouter } from 'next/router';
import React from 'react';
import Modal from 'react-modal';
import { jsx } from 'theme-ui';
import AppMenuContent from './AppMenuContent';
Modal.setAppElement('#__next');

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
