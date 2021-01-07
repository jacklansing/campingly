/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { GetCampsiteQuery } from '../../generated/graphql';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';
import CamperDetails from '../CamperDetails';
import CamperInviteDetails from '../CamperInviteDetails';

interface Props {
  campsiteData: GetCampsiteQuery;
}

const Members: React.FC<Props> = ({ campsiteData }) => {
  // Control currently shown tab
  const [tab, setTab] = useState(0);

  const allCampers = [
    campsiteData.getCampsite.manager,
    ...campsiteData.getCampsite.counselors,
    ...campsiteData.getCampsite.campers,
  ];
  return (
    <div sx={{ width: ['100%', null, null, null, '60%'] }}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        sx={{ mt: 4, width: '100%', borderBottom: 2 }}
      >
        {['Members', 'Invites'].map((label, idx) => (
          <TabButton label={label} idx={idx} setTab={setTab} currentTab={tab} />
        ))}
      </div>
      <div sx={{ width: '100%' }}>
        <TabPanel idx={0} currentTab={tab}>
          <motion.div variants={staggerChildren}>
            {allCampers.map((camper) => (
              <motion.div variants={fadeInUp} sx={{ my: 3 }}>
                <CamperDetails
                  username={camper.username}
                  email={camper.email}
                />
              </motion.div>
            ))}
          </motion.div>
        </TabPanel>
        <TabPanel idx={1} currentTab={tab}>
          <motion.div variants={staggerChildren}>
            {campsiteData.getCampsite.invites.map((invite) => (
              <motion.div variants={fadeInUp} sx={{ my: 3 }}>
                <CamperInviteDetails
                  email={invite.email}
                  status={invite.status}
                  role={invite.role}
                />
              </motion.div>
            ))}
          </motion.div>
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
