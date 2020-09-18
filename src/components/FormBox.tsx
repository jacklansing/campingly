import React from 'react';
import { Box, Divider, Heading } from 'theme-ui';

interface Props {
  header: string;
  width?: string[] | number[] | string | number;
}

const FormBox: React.FC<Props> = ({
  children,
  header,
  width = ['100%', '100%', '85%', '60%', '100%'],
}) => {
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 1,
        boxShadow: 4,
        width,
        height: 'fit-content',
      }}
      p={4}
      mt={4}
    >
      <Heading as="h2" variant="headings.h3">
        {header}
      </Heading>
      <Divider />
      {children}
    </Box>
  );
};

export default FormBox;
