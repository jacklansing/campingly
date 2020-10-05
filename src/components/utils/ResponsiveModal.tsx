/** @jsx jsx */
import { useThemeUI, jsx, IconButton, Button } from 'theme-ui';
import { Global } from '@emotion/core';
import Modal from 'react-modal';
import React from 'react';
import { useRouter } from 'next/router';
import ExitIcon from '../../assets/icons/exit-icon.svg';
import { motion } from 'framer-motion';
Modal.setAppElement('#__next');

interface Props {
  open: boolean;
}

const ResponsiveModal: React.FC<Props> = ({ open, children }) => {
  const router = useRouter();
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
        <Button
          sx={{
            position: 'absolute',
            top: 1,
            right: 1,
            backgroundColor: 'crimson',
            padding: 0,
            height: '25px',
            width: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            router.push(router.pathname, router.asPath, {
              shallow: true,
            });
          }}
        >
          <ExitIcon sx={{ height: '15px', width: '15px' }} />
        </Button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'fit-content' }}
          transition={{ duration: 0.2 }}
          sx={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
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
