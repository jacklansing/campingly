import { useRouter } from 'next/router';
import React from 'react';
import Modal from 'react-modal';
import AppMenuContent from './AppMenuContent';
interface Props {}

const AppMenu: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <Modal
      isOpen={!!router.query.appMenu}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() =>
        router.push(router.pathname, router.asPath, { shallow: true })
      }
      style={{
        content: {
          top: '11%',
          left: '74%',
          height: 'fit-content',
          width: '25%',
        },
      }}
    >
      <AppMenuContent />
    </Modal>
  );
};

export default AppMenu;
