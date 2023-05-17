import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { PushNotificationContainer as Container } from '@/styles/modules/push-notification';

interface IProps {
  isActive: boolean;
  message: string;
  quitFn: () => void;
}

export default function Notification(props: IProps): JSX.Element {
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
                <button
                  title='Close Panel'
                  className='box-btn_close'
                  onClick={props.quitFn}>
                  <IoClose />
                </button>
                <span className='prompt-title'>Notification</span>
                <section className='prompt-message'>
                  {props.message.includes('\n') ? (
                    props.message.split('\n').map((phrase) => <p>{phrase}</p>)
                  ) : (
                    <p>{props.message}</p>
                  )}
                </section>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
