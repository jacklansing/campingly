/** @jsx jsx */
import { Avatar, jsx, Text } from 'theme-ui';
import Badge from './utils/Badge';

interface Props {
  username: string;
  email: string;
  role?: string;
}

/**
 * Shows Camper Avatar, username, and email.
 */
const CamperDetails: React.FC<Props> = ({ username, email, role }) => {
  return (
    <div
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 3,
      }}
    >
      <Avatar
        src="/assets/default-avatar.svg"
        sx={{ verticalAlign: 'middle', width: '60px' }}
      />
      <div>
        <Text sx={{ my: 0 }}>
          {username}{' '}
          {role && <Badge>{role[0].toUpperCase() + role.slice(1)}</Badge>}
        </Text>
        <Text variant="subtitle" sx={{ my: 0 }}>
          {email}
        </Text>
      </div>
    </div>
  );
};

export default CamperDetails;
