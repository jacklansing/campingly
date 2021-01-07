/** @jsx jsx */
import { Avatar, jsx, Text } from 'theme-ui';

interface Props {
  username: string;
  email: string;
}

/**
 * Shows Camper Avatar, username, and email.
 */
const CamperDetails: React.FC<Props> = ({ username, email }) => {
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
        <Text sx={{ my: 0 }}>{username}</Text>
        <Text variant="subtitle" sx={{ my: 0 }}>
          {email}
        </Text>
      </div>
    </div>
  );
};

export default CamperDetails;
