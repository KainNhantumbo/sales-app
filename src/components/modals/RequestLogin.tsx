import { FC } from 'react';
import Link from 'next/link';
import { complements } from '@/shared/data';
import { NextRouter, useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { DefaultTheme, useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { IoArrowBackOutline, IoExitOutline } from 'react-icons/io5';
import { _prompt as Container } from '@/styles/modules/logout-prompt';

const RequestLogin: FC = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const { state, loginPromptController } = useAppContext();

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
                  Você precisa iniciar sessão para continuar.
                </p>
                <div>
                  <p>
                    Ainda não tem uma conta?{'  '}
                    <Link href='/auth/sign-up' onClick={loginPromptController}>
                      Crie uma nova conta.
                    </Link>
                  </p>
                </div>
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
};

export default RequestLogin;
