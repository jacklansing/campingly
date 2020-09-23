import Head from 'next/head';
import { Box } from 'theme-ui';
import Header from './Header';

interface LayoutProps {
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, children, ...props }) => {
  return (
    <>
      <Header />
      <Head>
        <title>{pageTitle} | Next-Theme-UI Boiler</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Next.js and Theme-UI Boilerplate with Authentication"
        />
      </Head>
      <Box
        as="main"
        sx={{
          display: 'flex',
          width: ['98%', '96%', '80%'],
          flexFlow: 'column wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        mx="auto"
        {...props}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
