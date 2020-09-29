import React from 'react';
import { Box, Button, Text } from 'theme-ui';
import ResponsiveModal from '../utils/ResponsiveModal';
import { useRouter } from 'next/router';

interface Props {
  open: boolean;
}

const CategoryRequiredModal: React.FC<Props> = ({ open }) => {
  const router = useRouter();
  return (
    <ResponsiveModal open={open}>
      <Box>
        <Text>You must create a category before adding any gear!</Text>
        <Box
          mt={3}
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            variant="contained"
            px={3}
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
            Create One Now
          </Button>
          <Button
            variant="outlined"
            px={3}
            onClick={() => {
              router.push(`/campsites/[id]`, `/campsites/${router.query.id}`, {
                shallow: true,
              });
            }}
          >
            Maybe Later
          </Button>
        </Box>
      </Box>
    </ResponsiveModal>
  );
};

export default CategoryRequiredModal;
