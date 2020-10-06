/** @jsx jsx */
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { Avatar, Button, Divider, jsx, Spinner } from 'theme-ui';
import ExitIcon from '../assets/icons/exit-icon.svg';
import LogoutIcon from '../assets/icons/logout-icon.svg';
import TentIcon from '../assets/icons/tent-icon.svg';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

const AppMenuContent: React.FC = ({}) => {
  const router = useRouter();
  const [, logout] = useLogoutMutation();
  const [{ data, fetching: meQueryFetching }, _] = useMeQuery();

  const closeModal = () => {
    router.push(router.pathname, router.asPath, {
      shallow: true,
    });
  };

  if (!data.me || meQueryFetching) {
    return <Spinner />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button
        aria-label="close menu"
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
          router.push(router.pathname, router.asPath, { shallow: true });
        }}
      >
        <ExitIcon sx={{ height: '15px', width: '15px' }} />
      </Button>
      <div sx={{ display: 'flex', flexFlow: 'row no-wrap' }}>
        <Avatar
          src="/assets/default-avatar.svg"
          sx={{ verticalAlign: 'middle', width: '60px' }}
        />
        <div sx={{ marginLeft: 3 }}>
          <div>{data.me.username}</div>
          <div>{data.me.email}</div>
        </div>
      </div>
      <Divider />
      <div>
        <div
          role="button"
          tabIndex={0}
          aria-label="go to campsites list"
          onKeyDown={(e) => {
            e.currentTarget.focus();
            if (e.key === 'Enter') {
              closeModal();
              router.push('/campsites');
            }
          }}
          onClick={() => {
            closeModal();
            router.push('/campsites');
          }}
          sx={{
            paddingTop: 2,
            color: 'primary',
            display: 'grid',
            gridTemplateColumns: '50px 1fr',
            alignItems: 'center',
            gap: '0 8px',
            cursor: 'pointer',
          }}
        >
          <TentIcon sx={{ height: '45px', width: '45px' }} />
          <div>Campsites</div>
        </div>
        <div
          role="button"
          tabIndex={0}
          aria-label="logout"
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              closeModal();
              await logout();
            }
          }}
          onClick={async () => {
            closeModal();
            await logout();
          }}
          sx={{
            paddingTop: 2,
            color: 'primary',
            display: 'grid',
            gridTemplateColumns: '50px 1fr',
            alignItems: 'center',
            gap: '0 8px',
            cursor: 'pointer',
          }}
        >
          <LogoutIcon sx={{ height: '30px', width: '30px' }} />
          <div>Sign Out</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppMenuContent;
