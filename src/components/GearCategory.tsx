/** @jsx jsx */
import React from 'react';
import { Box, Divider, Heading, IconButton, Text, jsx } from 'theme-ui';
import HandIcon from '../assets/icons/hand-icon.svg';
import CancelIcon from '../assets/icons/cancel-icon.svg';
import NeededIcon from '../assets/icons/needed-icon.svg';
import PackedIcon from '../assets/icons/packed-icon.svg';
import VolunteerIcon from '../assets/icons/volunteer-icon.svg';

const iconSize = {
  height: ['35px'],
  width: ['35px'],
};

const iconButtonSize = {
  minHeight: ['25px', '35px'],
  height: ['25px', '35px'],
  minWidth: ['25px', '35px'],
};

const GearItem: React.FC = ({ children }) => (
  <>
    <div
      role="row"
      sx={{
        marginTop: [2, 4],
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 2fr) 1fr 1fr 1fr',
        columnGap: 1,
      }}
    >
      <span role="cell">{children}</span>
      <span role="cell">24</span>
      <span role="cell">12</span>
      <Box
        role="cell"
        sx={{
          display: 'flex',
          flexFlow: 'row no-wrap',
        }}
      >
        <IconButton
          aria-label="volunteer to bring"
          sx={{ ...iconButtonSize, marginRight: 1 }}
        >
          <HandIcon sx={{ ...iconButtonSize }} />
        </IconButton>
        <IconButton
          aria-label="cancel volunteer to bring"
          sx={{ ...iconButtonSize }}
        >
          <CancelIcon sx={{ ...iconButtonSize }} />
        </IconButton>
      </Box>
    </div>
    <Divider />
  </>
);

interface GearCategoryProps {
  category: string;
}

const GearCategory: React.FC<GearCategoryProps> = ({ category }) => {
  return (
    <Box
      mt={4}
      p={2}
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
        Food
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
        <GearItem>Burgers</GearItem>
        <GearItem>Buns</GearItem>
        <GearItem>Eggs</GearItem>
        <GearItem>Bush's Baked Beans</GearItem>
      </div>
    </Box>
  );
};

export default GearCategory;
