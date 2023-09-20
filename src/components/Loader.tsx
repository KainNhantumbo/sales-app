import type { FC } from 'react';
import { motion } from 'framer-motion';
import { IoSync } from 'react-icons/io5';
import { _loading as Container } from '@/styles/modules/generic-loading';

interface IProps {
  message: string;
}

const Loader: FC<IProps> = ({ message }) => (
  <Container>
    <div>
      <motion.span
        animate={{
          rotate: 360,
          transition: { duration: 0.8, repeat: Infinity },
        }}>
        <IoSync />
      </motion.span>
      <h3>{message}</h3>
    </div>
  </Container>
);

export default Loader;
