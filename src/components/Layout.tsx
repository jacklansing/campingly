/** @jsx jsx */
import { motion } from 'framer-motion';
import Head from 'next/head';
import { jsx } from 'theme-ui';
import Header from './Header';

interface LayoutProps {
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, children, ...props }) => {
  return (
    <>
      <Header />
      <Head>
        <title>{pageTitle} | Campingly</title>
        <link rel="icon" href="/favicon/favicon-32x32.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Organize your camping trips with campingly"
        />
      </Head>
      <motion.main
        initial="initial"
        exit={{ opacity: 0 }}
        animate="animate"
        transition={{ delay: 0.2 }}
        sx={{
          display: 'flex',
          width: ['98%', '96%', '80%'],
          flexFlow: 'column wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 5,
        }}
        {...props}
      >
        {children}
      </motion.main>
    </>
  );
};

export default Layout;
