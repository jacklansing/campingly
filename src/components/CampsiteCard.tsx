/** @jsx jsx */
import React from 'react';
import { jsx, Image, Heading } from 'theme-ui';
import router from 'next/router';
import DateRange from './DateRange';
import { formatDate } from '../utils/formatDate';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

interface Props {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

const CampsiteCard: React.FC<Props> = ({ id, name, startDate, endDate }) => {
  return (
    <motion.div
      variants={fadeInUp}
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
    </motion.div>
  );
};
export default CampsiteCard;
