import PropTypes from 'prop-types';

// third-party
import { motion } from 'framer-motion';


export default function AnimateButton({ children, type }) {
  switch (type) {
    case 'rotate':
      return (
        <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 0 }}>
          {children}
        </motion.div>
      );

    case 'slide':
      return (
        <motion.div whileHover={{ x: 10 }} whileTap={{ x: 0 }}>
          {children}
        </motion.div>
      );

    case 'scale':
      return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );

    default:
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );
  }
}

AnimateButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['slide', 'scale', 'rotate'])
};

AnimateButton.defaultProps = {
  type: 'scale'
};
