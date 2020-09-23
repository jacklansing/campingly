/** @jsx jsx */
import React, { useState } from 'react';
import { Button, jsx } from 'theme-ui';
import BackpackIcon from '../assets/icons/backpack-icon.svg';
import ExitIcon from '../assets/icons/exit-icon.svg';

interface ExpandedProps {
  show: boolean;
}

const Expanded: React.FC<ExpandedProps> = ({ show }) => {
  return (
    <ul
      sx={{
        position: 'fixed',
        bottom: '120px',
        right: 4,
        transition: 'all .1s ease',
        transform: show ? 'scale(0)' : 'scale(1)',
        opacity: show ? 0 : 1,
        transformOrigin: 'bottom right',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        backgroundColor: 'pink',
        zIndex: show ? 1 : 0,
        height: 'fit-content',
      }}
    >
      <li>
        <Button sx={{ borderRadius: 1, height: ['50px'], width: ['100%'] }}>
          New Location
        </Button>
      </li>
      <li>
        <Button
          mt={2}
          sx={{ borderRadius: 1, height: ['50px'], width: ['100%'] }}
        >
          New Gear
        </Button>
      </li>
    </ul>
  );
};

interface Props {}

const Fab: React.FC<Props> = ({}) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <Expanded show={expand} />
      <Button
        onClick={() => setExpand(!expand)}
        sx={{
          height: ['60px', '75px'],
          width: ['60px', '75px'],
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: '36px',
          right: 4,
          borderRadius: '50%',
          boxShadow: 4,
          ':hover': {
            boxShadow: 6,
          },
        }}
      >
        {expand ? (
          <BackpackIcon sx={{ maxHeight: '100%' }} />
        ) : (
          <ExitIcon sx={{ maxHeight: '40%', maxWidth: '50%' }} />
        )}
      </Button>
    </>
  );
};

export default Fab;
