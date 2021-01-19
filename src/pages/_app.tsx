import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'theme-ui';
import theme from '../utils/theme';
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
