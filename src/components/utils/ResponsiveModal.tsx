import { useThemeUI } from 'theme-ui';
import { Global } from '@emotion/core';
import Modal from 'react-modal';
import React from 'react';
Modal.setAppElement('#__next');

interface Props {
  open: boolean;
}

const ResponsiveModal: React.FC<Props> = ({ open, children }) => {
  const context = useThemeUI();
  const breakpoints = context.theme.breakpoints as string[];

  const mq = breakpoints.map((bp) => `@media (min-width: ${bp})`);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '96%',
    },
  };

  return (
    <>
      <Modal isOpen={open} className="ReactModalCustom">
        {children}
      </Modal>
      <Global
        styles={{
          '.ReactModalCustom': {
            ...(Modal.defaultStyles.content as any),
            ...customStyles.content,
            [mq[0]]: {
              width: '96%',
            },
            [mq[1]]: {
              width: '65%',
            },
            [mq[3]]: {
              width: '33%',
            },
            [mq[4]]: {
              width: '25%',
            },
          },
        }}
      />
    </>
  );
};

export default ResponsiveModal;
