/** @jsx jsx */
import DetailsIcon from '../assets/icons/details-icon.svg';
import GroupIcon from '../assets/icons/group-icon.svg';
import { Button, jsx } from 'theme-ui';
import { useRouter } from 'next/router';

interface Props {}

const buttonStyles = {
  height: ['60px', null, '65px'],
  width: ['60px', null, '65px'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  boxShadow: 2,
  backgroundColor: 'primary',
  transition: 'all .2s ease',
  ':hover': {
    transform: 'scale(1.1)',
  },
  ':focus': {
    outline: 'none',
    transform: 'scale(1.1)',
  },
};

const CampsiteMenu: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <div
      sx={{
        marginTop: 4,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 4,
      }}
    >
      <Button
        sx={buttonStyles}
        aria-label="switch to campsite details section"
        onClick={() =>
          router.push(
            `/campsites/[id]/?section=details`,
            `/campsites/${router.query.id}`,
            {
              shallow: true,
            },
          )
        }
      >
        <DetailsIcon />
      </Button>
      <Button
        sx={buttonStyles}
        aria-label="switch to campsite members section"
        onClick={() =>
          router.push(
            `/campsites/[id]/?section=members`,
            `/campsites/${router.query.id}`,
            {
              shallow: true,
            },
          )
        }
      >
        <GroupIcon />
      </Button>
    </div>
  );
};

export default CampsiteMenu;
