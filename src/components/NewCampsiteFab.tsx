/** @jsx jsx */
import React from 'react';
import { Button, jsx } from 'theme-ui';
import AddIcon from '../assets/icons/add-icon.svg';
import { useRouter } from 'next/router';

interface Props {}

const NewCampsiteFab: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <Button
      aria-label="show campsite options"
      onClick={() =>
        router.push(`/campsites?createCampsite=true`, `/campsites`, {
          shallow: true,
        })
      }
      sx={{
        height: ['50px', '60px'],
        width: ['50px', '60px'],
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '24px',
        right: 3,
        borderRadius: '50%',
        boxShadow: 4,
        ':hover': {
          boxShadow: 6,
        },
      }}
    >
      <AddIcon sx={{ maxHeight: [null, '40%'], maxWidth: [null, '50%'] }} />
    </Button>
  );
};

export default NewCampsiteFab;
