import { useTheme } from 'styled-components';
import { complements } from '@/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { IoArrowBackOutline, IoExitOutline } from 'react-icons/io5';
import { PromptContainer as Container } from '../../styles/modules/logout-prompt';

export default function LogoutPrompt(): JSX.Element {
  const { state, loginPromptController } = useAppContext();
  const theme = useTheme();
  const router: NextRouter = useRouter();

  return (
    <AnimatePresence>
      {state.isLoginPrompt && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              loginPromptController();
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
                <span className='prompt-title'>
                  {complements.defaultTitle} | Iniciar sessão
                </span>
                <p className='prompt-message'>
                  Você precisa iniciar sessão para fazer isso.
                </p>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={loginPromptController}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  style={{ background: `rgb(${theme.primary_variant})` }}
                  onClick={() => {
                    loginPromptController();
                    router.push('/auth/sign-in');
                  }}>
                  <IoExitOutline />
                  <span>Iniciar sessão</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
