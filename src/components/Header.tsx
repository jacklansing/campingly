import { Flex, Heading } from 'theme-ui';
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
      px="4"
      py="4"
      bg="translucent"
    >
      <Heading as="h5" sx={{ variant: 'headings.h2' }}>
        Campingly
      </Heading>
      <NavBar />
    </Flex>
  );
};

export default Header;
