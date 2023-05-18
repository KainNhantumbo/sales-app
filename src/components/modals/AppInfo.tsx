import { motion, AnimatePresence } from 'framer-motion';
import { AppInfoContainer as Container } from '../../styles/modules/app-info';
import { app_metadata } from '@/data/app-data';
import {
  IoClose,
  IoChatbubbleEllipses,
  IoCodeSlash,
  IoRibbon,
  IoFlower,
} from 'react-icons/io5';

interface IProps {
  controller: () => void;
  status: boolean;
}

export default function AppInfoBox(props: IProps): JSX.Element {
  return (
    <AnimatePresence>
      {props.status && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              props.controller();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-box'>
              <div className='box-info'>
                <span className='box-title'>App Information</span>
                <h2 className='box-app-name'>
                  <IoChatbubbleEllipses />
                  <span>
                    {app_metadata.appName} v{app_metadata.version} Desktop
                  </span>
                </h2>
                <h3>
                  <IoCodeSlash />
                  <span>
                    <i>Developer:</i> {app_metadata.developer}
                  </span>
                </h3>
              </div>

              <section className='contacts'>
                {app_metadata.contacts.map((contact) => (
                  <div key={contact.name} className='contact'>
                    {<contact.icon />}
                    <span>{contact.name}: </span>
                    <a
                      href={contact.url}
                      target={'_blank'}
                      rel={'noreferrer noopener'}>
                      {contact.url}
                    </a>
                  </div>
                ))}
              </section>

              <div className='legal'>
                <h3>
                  <IoRibbon />
                  <span>{app_metadata.license}</span>
                </h3>

                <h3>
                  <IoFlower />
                  <span>
                    &copy; {app_metadata.copyright} / {app_metadata.appName}
                  </span>
                </h3>
              </div>
              <button
                title='Close Panel'
                className='box-btn'
                onClick={props.controller}>
                <IoClose />
              </button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
