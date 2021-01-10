/** @jsx jsx */
import router from 'next/router';
import React, { memo } from 'react';
import { Heading, Image, jsx } from 'theme-ui';
import { formatDate } from '../utils/formatDate';
import DateRange from './DateRange';
import FadeInUp from './utils/FadeInUp';

interface Props {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

const CampsiteCard: React.FC<Props> = ({ id, name, startDate, endDate }) => {
  return (
    <FadeInUp
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
        padding: 4,
        marginTop: 4,
        marginLeft: [0, 0, 4],
      }}
      // @ts-expect-error
      tabIndex={0}
      role="button"
      aria-label="Go to campsite details"
      onClick={() =>
        router.push(`/campsites/[id]?section=details`, `/campsites/${id}`)
      }
      onKeyDown={(e) =>
        e.key === 'Enter'
          ? router.push(`/campsites/[id]?section=details`, `/campsites/${id}`)
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
    </FadeInUp>
  );
};
export default memo(CampsiteCard);
