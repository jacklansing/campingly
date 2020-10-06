/** @jsx jsx */
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Avatar, Box, Button, jsx, Link } from 'theme-ui';
import { useMeQuery } from '../generated/graphql';
import AppMenu from './AppMenu';
import MobileMenu from './MobileMenu';

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
  const [{ data }, _] = useMeQuery();
  const router = useRouter();

  return (
    <>
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
            aria-label="open navigation"
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
              alt="avatar"
              src="/assets/default-avatar.svg"
              sx={{ verticalAlign: 'middle' }}
            />
          </Button>
          <Button
            aria-label="open navigation"
            onClick={(e) => {
              e.currentTarget.blur();
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
              alt="avatar"
              src="/assets/default-avatar.svg"
              sx={{ verticalAlign: 'middle', width: '50px' }}
            />
          </Button>
          <AppMenu />
          <MobileMenu />
        </Box>
      ) : (
        <Box
          as="nav"
          sx={{
            display: ['flex', 'flex', 'block'],
            alignSelf: ['center', 'center', 'start'],
          }}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/login">Login</NavLink>
        </Box>
      )}
    </>
  );
};

export default NavBar;
