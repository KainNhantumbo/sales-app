import { GenericLoading as Container } from '@/styles/common/generic-loading';
import { motion } from 'framer-motion';
import { IoSync } from 'react-icons/io5';

interface IProps {
  message: string;
}

export default function Loader({ message }: IProps): JSX.Element {
  return (
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
}
