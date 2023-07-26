import { FC } from 'react';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoExitOutline } from 'react-icons/io5';
import { _prompt as Container } from '@/styles/modules/logout-prompt';

const LogoutPrompt: FC = (): JSX.Element => {
  const { state, logoutUser, logoutPromptController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isLogoutPrompt && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              logoutPromptController();
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
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Sair</span>
                <p className='prompt-message'>
                  Você realmente gostaria de terminar esta sessão e sair?
                </p>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={logoutPromptController}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button className='prompt-accept' onClick={logoutUser}>
                  <IoExitOutline />
                  <span>Terminar sessão</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default LogoutPrompt;
