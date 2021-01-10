/** @jsx jsx */
import { motion } from 'framer-motion';
import { jsx } from 'theme-ui';
import { fadeInUp } from '../../utils/animations';

interface Props {}

/**
 * A simple div component that applies the fadeInUp animation via framer-motion.
 */
const FadeInUp: React.FC<Props> = ({ children, ...props }) => {
  return (
    <motion.div variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  );
};

export default FadeInUp;
