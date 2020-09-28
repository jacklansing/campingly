import React from 'react';
import { Box, Image, Heading } from 'theme-ui';
import router from 'next/router';
import DateRange from './DateRange';
import { formatDate } from '../utils/formatDate';

interface Props {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

const CampsiteCard: React.FC<Props> = ({ id, name, startDate, endDate }) => {
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 1,
        boxShadow: 2,
        minWidth: ['300px', '320px'],
        maxWidth: ['300px', '320px'],
        height: 'fit-content',
        cursor: 'pointer',
        transition: 'all .1s ease',
        ':hover': {
          boxShadow: 4,
        },
        ':focus': {
          boxShadow: 4,
          outline: 'none',
        },
      }}
      p={4}
      mt={4}
      ml={[0, 0, 4]}
      tabIndex={0}
      role="button"
      aria-label="Go to campsite details"
      onClick={() => router.push(`/campsites/[id]`, `/campsites/${id}`)}
      onKeyDown={(e) =>
        e.key === 'Enter'
          ? router.push(`/campsites/[id]`, `/campsites/${id}`)
          : null
      }
    >
      <Image
        sx={{ maxHeight: '50%', maxWidth: 'fit' }}
        src="/assets/campsite.svg"
        alt="campsite"
      />
      <Heading as="h3" variant="headings.h3" sx={{ textAlign: 'center' }}>
        {name}
      </Heading>
      <DateRange
        as="h4"
        variant="headings.h5"
        startDate={formatDate(startDate)}
        endDate={formatDate(endDate)}
        mt={2}
        mx="auto"
      />
    </Box>
  );
};
export default CampsiteCard;
