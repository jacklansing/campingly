/** @jsx jsx */
import React from 'react';
import { Box, Divider, Heading, IconButton, jsx } from 'theme-ui';
import HandIcon from '../assets/icons/hand-icon.svg';
import CancelIcon from '../assets/icons/cancel-icon.svg';
import NeededIcon from '../assets/icons/needed-icon.svg';
import PackedIcon from '../assets/icons/packed-icon.svg';
import VolunteerIcon from '../assets/icons/volunteer-icon.svg';
import UndoIcon from '../assets/icons/undo-icon.svg';
import { Gear, useUndoVolunteerGearMutation } from '../generated/graphql';
import { useDeleteGearMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

const iconSize = {
  height: ['35px'],
  width: ['35px'],
};

const iconButtonSize = {
  minHeight: ['25px', '35px'],
  height: ['25px', '35px'],
  minWidth: ['25px', '35px'],
};

interface GearItemProps {
  id: number;
  gearCategoryId: number;
  needed: number;
  volunteered: number;
  userHasVolunteered: boolean;
}

const GearItem: React.FC<GearItemProps> = ({
  id,
  gearCategoryId,
  needed,
  volunteered,
  userHasVolunteered,
  children,
  ...props
}) => {
  const [_, deleteGear] = useDeleteGearMutation();
  const [__, undoVolunteerGear] = useUndoVolunteerGearMutation();
  const router = useRouter();
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        {...props}
        role="row"
        sx={{
          marginTop: [2, 4],
          display: 'grid',
          gridTemplateColumns: 'minmax(120px, 2fr) 1fr 1fr 1fr',
          columnGap: 1,
        }}
      >
        <span role="cell">{children}</span>
        <span role="cell">{needed}</span>
        <span role="cell">{volunteered}</span>
        <Box
          role="cell"
          sx={{
            display: 'flex',
            flexFlow: 'row no-wrap',
          }}
        >
          {userHasVolunteered ? (
            <IconButton
              aria-label="undo volunteer to bring"
              sx={{
                ...iconButtonSize,
                marginRight: 1,
              }}
              onClick={async () => {
                await undoVolunteerGear({ gearId: id });
              }}
            >
              <UndoIcon sx={{ ...iconButtonSize }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="volunteer to bring"
              sx={{
                ...iconButtonSize,
                marginRight: 1,
                transition: 'all .2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                },
              }}
              onClick={() => {
                router.push(
                  `/campsites/[id]/?volunteerGear=true&gearId=${id}`,
                  `/campsites/${router.query.id}`,
                  {
                    shallow: true,
                  },
                );
              }}
            >
              <HandIcon sx={{ ...iconButtonSize }} />
            </IconButton>
          )}
          <IconButton
            aria-label="delete gear"
            sx={{ ...iconButtonSize }}
            onClick={async () => {
              await deleteGear({ gearId: id, gearCategoryId });
            }}
          >
            <CancelIcon sx={{ ...iconButtonSize }} />
          </IconButton>
        </Box>
      </motion.div>
      <Divider />
    </>
  );
};

interface GearCategoryProps {
  category: string;
  gear: Gear[];
}

const GearCategory: React.FC<GearCategoryProps> = ({ category, gear }) => {
  return (
    <Box
      mt={4}
      p={[2, 2, 2, 4]}
      sx={{
        minHeight: 'fit-content',
        width: ['100%', null, null, null, '60%'],
        border: [null, null, 2],
        borderRadius: [null, null, 1],
        boxShadow: [null, null, 4],
        marginBottom: 4,
      }}
    >
      <Heading px={2} py={2} as="h4" variant="headings.h3">
        {category}
      </Heading>

      <div
        role="table"
        sx={{
          listStyle: 'none',
          paddingLeft: [0, null, 3],
          paddingRight: [0],
          margin: 0,
        }}
      >
        <div
          role="row"
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            marginRight: 3,
            marginBottom: '-1rem',
          }}
        >
          <Box role="columnheader" aria-label={`${category} name`}></Box>
          <Box role="columnheader">
            <NeededIcon sx={{ ...iconSize, marginLeft: [2, 0] }} />
          </Box>
          <Box role="columnheader">
            <PackedIcon sx={{ ...iconSize, marginLeft: [3, 1] }} />
          </Box>
          <Box role="columnheader">
            <VolunteerIcon sx={{ ...iconSize, marginLeft: 4 }} />
          </Box>
        </div>
        <AnimatePresence>
          {gear.length ? (
            gear.map((g) => (
              <GearItem
                key={g.id}
                id={g.id}
                gearCategoryId={g.gearCategoryId}
                needed={g.quantity}
                userHasVolunteered={g.userHasVolunteered}
                volunteered={g.gearVolunteers.reduce(
                  (a, b) => a + b.volunteerAmount,
                  0,
                )}
              >
                {g.name}
              </GearItem>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              sx={{
                textAlign: 'center',
                marginTop: 4,
                marginBottom: 4,
                paddingTop: 3,
              }}
            >
              No gear for this category, yet!{' '}
              <div>
                Use the backpack to <strong>Add Gear</strong>.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Box>
  );
};

export default GearCategory;
