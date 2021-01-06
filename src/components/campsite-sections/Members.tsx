/** @jsx jsx */
import { Avatar, jsx, Text } from 'theme-ui';
import React, { useState } from 'react';
import { GetCampsiteQuery } from '../../generated/graphql';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '../../utils/animations';

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
            {allCampers.map((campers) => (
              <motion.div
                variants={fadeInUp}
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
                  <Text sx={{ my: 0 }}>{campers.username}</Text>
                  <Text variant="subtitle" sx={{ my: 0 }}>
                    {campers.email}
                  </Text>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabPanel>
        <TabPanel idx={1} currentTab={tab}>
          {campsiteData.getCampsite.invites.map((invites) => (
            <pre sx={{ fontSize: 1 }}>{JSON.stringify(invites, null, 2)}</pre>
          ))}
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
      fontSize: 2,
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
