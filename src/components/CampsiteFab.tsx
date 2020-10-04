/** @jsx jsx */
import React, { useState } from 'react';
import { Button, jsx } from 'theme-ui';
import BackpackIcon from '../assets/icons/backpack-icon.svg';
import ExitIcon from '../assets/icons/exit-icon.svg';
import { useRouter } from 'next/router';

interface ExpandedProps {
  show: boolean;
  hasCategories: boolean;
}

const Expanded: React.FC<ExpandedProps> = ({ show, hasCategories }) => {
  const router = useRouter();
  return (
    <ul
      sx={{
        position: 'fixed',
        bottom: '120px',
        right: 4,
        transition: 'all .1s ease',
        transform: show ? 'scale(1)' : 'scale(0)',
        opacity: show ? 1 : 0,
        transformOrigin: 'bottom right',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        zIndex: show ? 0 : 1,
        height: 'fit-content',
      }}
    >
      <li>
        <Button
          sx={{ borderRadius: 1, height: ['50px'], width: ['100%'] }}
          onClick={() =>
            router.push(
              `/campsites/[id]/?newCategory=true`,
              `/campsites/${router.query.id}`,
              {
                shallow: true,
              },
            )
          }
        >
          New Category
        </Button>
      </li>
      <li>
        <Button
          mt={2}
          sx={{ borderRadius: 1, height: ['50px'], width: ['100%'] }}
          onClick={() =>
            hasCategories
              ? router.push(
                  `/campsites/[id]/?addGear=true`,
                  `/campsites/${router.query.id}`,
                  {
                    shallow: true,
                  },
                )
              : router.push(
                  `/campsites/[id]/?categoryRequired=true`,
                  `/campsites/${router.query.id}`,
                  {
                    shallow: true,
                  },
                )
          }
        >
          New Gear
        </Button>
      </li>
    </ul>
  );
};

interface Props {
  hasCategories: boolean;
}

const Fab: React.FC<Props> = ({ hasCategories }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <Expanded show={expand} hasCategories={hasCategories} />
      <Button
        aria-label="show campsite options"
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
          <ExitIcon sx={{ maxHeight: '40%', maxWidth: '50%' }} />
        ) : (
          <BackpackIcon sx={{ maxHeight: '100%' }} />
        )}
      </Button>
    </>
  );
};

export default Fab;
