import Link from 'next/link';
import { Flex, Heading, Image } from 'theme-ui';
import NavBar from './NavBar';

const Header: React.FC = () => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: ['96%', '90%', '80%'],
      }}
      mx="auto"
      px={[1, 2, 2, 4]}
      py={[1, 2, 2, 4]}
      bg="translucent"
    >
      <Heading as="h5" sx={{ variant: 'headings.h2' }}>
        <Link href="/campsites">
          <Image
            alt="Campingly Logo"
            src="/assets/campingly_logo.png"
            sx={{
              maxHeight: ['75px', null, null, '125px'],
              cursor: 'pointer',
            }}
          />
        </Link>
      </Heading>
      <NavBar />
    </Flex>
  );
};

export default Header;
