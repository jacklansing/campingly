import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Modal from 'react-modal';
import AppMenuContent from './AppMenuContent';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
Modal.setAppElement('#__next');

const AppMenu: React.FC = ({}) => {
  const router = useRouter();
  const modal = useRef(null);
  return (
    <Modal
      ref={modal}
      isOpen={!!router.query.appMenu}
      shouldCloseOnOverlayClick={true}
      onAfterOpen={() => disableBodyScroll(modal as any)}
      onAfterClose={() => enableBodyScroll(modal as any)}
      onRequestClose={() =>
        router.push(router.pathname, router.asPath, { shallow: true })
      }
      style={{
        content: {
          position: 'relative',
          top: '75px',
          left: '-1.333%',
          height: 'fit-content',
          width: '25%',
          minWidth: '320px',
          marginLeft: 'auto',
        },
      }}
    >
      <AppMenuContent />
    </Modal>
  );
};

export default AppMenu;
