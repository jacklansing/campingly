/** @jsx jsx */
import NextLink from 'next/link';
import React from 'react';
import { Box, Button, Link, jsx, Avatar } from 'theme-ui';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

import { useRouter } from 'next/router';
import MobileMenu from './MobileMenu';
import AppMenu from './AppMenu';

interface NavLinkProps {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <NextLink href={href}>
    <Link
      px={2}
      py={1}
      mx={2}
      sx={{
        fontSize: [null, null, 3, 3, 3, 4, 4],
        textDecoration: 'none',
        color: 'black',
        letterSpacing: '0.5px',
        height: 'fit-content',
        fontWeight: 'bold',
        position: 'relative',
        cursor: 'pointer',
        '::after': {
          content: [null, null, "''"],
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          borderBottomStyle: 'solid',
          borderBottomWidth: '4px',
          borderColor: 'primary',
          opacity: 0,
          transition: 'all .222s ease',
        },
        ':hover': {
          '::after': {
            opacity: 1,
          },
        },
      }}
    >
      {children}
    </Link>
  </NextLink>
);

const NavBar: React.FC = ({}) => {
  const [{ data, fetching: meQueryFetching }, _] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();

  let navBar = null;
  if (meQueryFetching) {
    // Data is loading
  } else if (!data?.me) {
    // Not logged in
    navBar = (
      <>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/login">Login</NavLink>
      </>
    );
  } else {
    // User is logged in
    navBar = (
      <>
        {/* <Button
          variant="contained"
          disabled={logoutFetching}
          onClick={async () => await logout()}
          mt={4}
          px={5}
          sx={{
            display: ['none', null, 'block'],
            marginLeft: 'auto',
          }}
        >
          Logout
        </Button> */}
      </>
    );
  }

  return (
    <>
      <Box
        as="nav"
        sx={{
          display: ['flex', 'flex', 'block'],
          alignSelf: ['center', 'center', 'start'],
        }}
      >
        {navBar}
      </Box>
      {data?.me ? (
        <Box
          as="nav"
          sx={{
            position: 'absolute',
            top: 2,
            right: 0,
          }}
        >
          <Button
            onClick={() => {
              router.push(
                `${router.pathname}/?mobileAppMenu=open`,
                router.asPath,
                {
                  shallow: true,
                },
              );
            }}
            aria-haspopup="true"
            sx={{
              display: ['block', null, 'none'],
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            <Avatar
              src="/assets/default-avatar.svg"
              sx={{ verticalAlign: 'middle' }}
            />
          </Button>
          <Button
            onClick={() => {
              router.push(`${router.pathname}/?appMenu=open`, router.asPath, {
                shallow: true,
              });
            }}
            aria-haspopup="true"
            sx={{
              display: ['none', null, 'block'],
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            <Avatar
              src="/assets/default-avatar.svg"
              sx={{ verticalAlign: 'middle', width: '50px' }}
            />
          </Button>
          <AppMenu />
          <MobileMenu />
        </Box>
      ) : null}
    </>
  );
};

export default NavBar;
