/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import React, { useState } from 'react';
import { GetCampsiteQuery } from '../../generated/graphql';
import CamperDetails from '../CamperDetails';
import CamperInviteDetails from '../CamperInviteDetails';
import FadeInUp from '../utils/FadeInUp';
import StaggerChildren from '../utils/StaggerChildren';
import InviteCamperForm from '../forms/InviteCamperForm';

interface Props {
  campsiteData: GetCampsiteQuery;
}

const Members: React.FC<Props> = ({ campsiteData }) => {
  // Control currently shown tab
  const [tab, setTab] = useState(0);
  const { manager } = campsiteData.getCampsite;
  const { counselors } = campsiteData.getCampsite;
  const { campers } = campsiteData.getCampsite;
  return (
    <div sx={{ width: ['100%', null, null, null, '60%'] }}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        sx={{ mt: 4, width: '100%', borderBottom: 2 }}
      >
        <Box mb={3}>
          <InviteCamperForm />
          <p
            sx={{
              width: '100%',
              fontSize: 2,
              textAlign: ['center', null, null, 'left'],
            }}
          >
            Enter an email to invite people to your campsite!
          </p>
        </Box>
        {['Members', 'Invites'].map((label, idx) => (
          <TabButton
            key={idx}
            label={label}
            idx={idx}
            setTab={setTab}
            currentTab={tab}
          />
        ))}
      </div>
      <div sx={{ width: '100%' }}>
        <TabPanel idx={0} currentTab={tab}>
          <StaggerChildren>
            <FadeInUp sx={{ my: 3 }}>
              <CamperDetails
                username={manager.username}
                email={manager.email}
                role="manager"
              />
            </FadeInUp>
            {counselors.map((counselor, idx) => (
              <FadeInUp key={idx} sx={{ my: 3 }}>
                <CamperDetails
                  username={counselor.username}
                  email={counselor.email}
                  role="counselor"
                />
              </FadeInUp>
            ))}
            {campers.map((camper, idx) => (
              <FadeInUp key={idx} sx={{ my: 3 }}>
                <CamperDetails
                  username={camper.username}
                  email={camper.email}
                  role="camper"
                />
              </FadeInUp>
            ))}
          </StaggerChildren>
        </TabPanel>
        <TabPanel idx={1} currentTab={tab}>
          <StaggerChildren>
            {campsiteData.getCampsite.invites.map((invite, idx) => (
              <FadeInUp key={idx} sx={{ my: 3 }}>
                <CamperInviteDetails
                  email={invite.email}
                  status={invite.status}
                  role={invite.role}
                />
              </FadeInUp>
            ))}
          </StaggerChildren>
        </TabPanel>
      </div>
    </div>
  );
};

const TabButton = ({ label, idx, setTab, currentTab }) => (
  <button
    type="button"
    role="tab"
    tabIndex={-1}
    onClick={() => setTab(idx)}
    sx={{
      position: 'relative',
      background: 'none',
      border: 'none',
      padding: 2,
      fontFamily: 'body',
      mr: 2,
      fontSize: 3,
      outline: 0,
      '::after': {
        content: "''",
        position: 'absolute',
        bottom: -0.5,
        left: 0,
        width: '100%',
        borderBottomStyle: 'solid',
        borderBottomWidth: '2.5px',
        borderColor: 'primary',
        opacity: currentTab === idx ? 1 : 0,
        transition: 'all .222s ease',
      },
    }}
  >
    {label}
  </button>
);

const TabPanel = ({ currentTab, idx, children }) =>
  currentTab === idx ? (
    <div role="tabpanel" tabIndex={0}>
      {children}
    </div>
  ) : null;

export default Members;
