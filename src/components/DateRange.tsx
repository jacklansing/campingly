/** @jsx jsx */
import React from 'react';
import { Box, Heading, HeadingProps, jsx } from 'theme-ui';
import ArrowIcon from '../assets/icons/arrow-icon.svg';

const DateBox = ({ children }) => (
  <Box
    as="span"
    px={3}
    py={'.444rem'}
    sx={{
      backgroundColor: 'primary',
      borderRadius: 1,
      color: 'white',
      boxShadow: 1,
    }}
  >
    {children}
  </Box>
);

type Props = HeadingProps & {
  startDate: string;
  endDate: string;
  as: React.ElementType<any>;
  variant?: string;
};

const DateRange: React.FC<Props> = ({
  startDate,
  endDate,
  as,
  variant,
  ...props
}) => {
  return (
    <Heading
      as={as}
      variant={variant}
      {...props}
      sx={{
        textAlign: 'center',
        fontWeight: 'body',
        display: 'flex',
        flexFlow: 'row no-wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '200px',
      }}
    >
      <DateBox>{startDate}</DateBox>
      <ArrowIcon
        aria-label="right arrow"
        sx={{
          height: '1.333rem',
          width: '1.333rem',
        }}
      />
      <DateBox>{endDate}</DateBox>
    </Heading>
  );
};

export default DateRange;
