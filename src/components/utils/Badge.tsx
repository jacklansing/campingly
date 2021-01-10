/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

const Badge: React.FC = ({ children }) => {
  return (
    <Box
      as="span"
      px={2}
      py={1}
      mx={2}
      sx={{
        backgroundColor: 'light',
        borderRadius: 1,
        color: 'white',
        boxShadow: 1,
        fontSize: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Badge;
