import { PuffLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { PushNotificationContainer as Container } from '@/styles/modules/push-notification';

interface IProps {
  isActive: boolean;
}

export default function PageLoader(props: IProps): JSX.Element {
  const theme: DefaultTheme = useTheme()
  return (
    <AnimatePresence>
      {props.isActive && (
        <Container>
          <motion.section
            className='dialog-modal'
            initial={{ x: 500, opacity: 0 }}
            exit={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <p>Carregando a página</p>
              </div>
              <PuffLoader size={25} color={`rgb(${theme.primary_variant})`}/>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
