/** @jsx jsx */
import { Avatar, jsx, Text } from 'theme-ui';

interface Props {
  email: string;
  status: string;
  role: string;
}

const CamperInviteDetails: React.FC<Props> = ({ email, status, role }) => {
  const formatStatus = (status: string) => {
    return status[0].toUpperCase() + status.slice(1);
  };

  const formatRole = (role: string) => {
    return role[0] + role.slice(1).toLowerCase();
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'accepted':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
    }
  };

  return (
    <div
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 3,
        my: 3,
      }}
    >
      <Avatar
        src="/assets/default-avatar.svg"
        sx={{ verticalAlign: 'middle', width: '60px' }}
      />
      <div>
        <Text sx={{ my: 0 }}>{`${email} (${formatRole(role)})`}</Text>
        <Text variant="subtitle" sx={{ my: 0 }}>
          {`${formatStatus(status)} ${getStatusEmoji(status)}`}
        </Text>
      </div>
    </div>
  );
};

export default CamperInviteDetails;
