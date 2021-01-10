/** @jsx jsx */
import { motion } from 'framer-motion';
import { jsx } from 'theme-ui';
import { staggerChildren } from '../../utils/animations';

interface Props {}

const StaggerChildren: React.FC<Props> = ({ children, ...props }) => {
  return (
    <motion.div variants={staggerChildren} {...props}>
      {children}
    </motion.div>
  );
};

export default StaggerChildren;
