import React from 'react';
import { GetCampsiteQuery } from '../../generated/graphql';

interface Props {
  campsiteData: GetCampsiteQuery;
}

const Members: React.FC<Props> = ({ campsiteData }) => {
  return (
    <>
      {campsiteData.getCampsite.invites.map((invite) => (
        <pre>{JSON.stringify(invite, null, 2)}</pre>
      ))}
    </>
  );
};

export default Members;
