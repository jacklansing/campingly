import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Modal from 'react-modal';
import AppMenuContent from './AppMenuContent';
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
          display: 'contents',
        },
      }}
    >
      <AppMenuContent />
    </Modal>
  );
};

export default AppMenu;
