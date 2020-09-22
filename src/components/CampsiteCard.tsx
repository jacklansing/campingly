import React from 'react';
import { Box, Image, Heading } from 'theme-ui';
import router from 'next/router';

interface Props {}

const CampsiteCard: React.FC<Props> = ({}) => {
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 1,
        boxShadow: 2,
        minWidth: ['318px'],
        maxWidth: ['318px'],
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
      onClick={() =>
        router.push('/campsites/f028754c-fd04-11ea-adc1-0242ac120002')
      }
      onKeyDown={(e) =>
        e.key === 'Enter'
          ? router.push('/campsites/f028754c-fd04-11ea-adc1-0242ac120002')
          : null
      }
    >
      <Image
        sx={{ maxHeight: '50%', maxWidth: 'fit' }}
        src="/assets/campsite.svg"
        alt="campsite"
      />
      <Heading as="h3" variant="headings.h3" sx={{ textAlign: 'center' }}>
        Holmes Lake
      </Heading>
      <Heading
        as="h4"
        variant="headings.h5"
        mt={1}
        sx={{ textAlign: 'center', fontWeight: 'body' }}
      >
        9/24 - 9/25
      </Heading>
    </Box>
  );
};
export default CampsiteCard;
