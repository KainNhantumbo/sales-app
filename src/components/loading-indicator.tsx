import { Router } from 'next/router';
import { PuffLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { _pageLoader as Container } from '@/styles/modules/page-loader';

export  function LoadingIndicator() {
  const theme = useTheme();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const startPageTransition = () => setLoadingPage(true);
  const endPageTransition = () => setLoadingPage(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', startPageTransition);
    Router.events.on('routeChangeComplete', endPageTransition);
    Router.events.on('routeChangeError', endPageTransition);
    return () => {
      Router.events.off('routeChangeStart', startPageTransition);
      Router.events.off('routeChangeComplete', endPageTransition);
      Router.events.off('routeChangeError', endPageTransition);
    };
  }, []);

  return (
    <AnimatePresence>
      {loadingPage && (
        <Container>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, y: 500 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1.2 }
            }}
            exit={{
              opacity: 0,
              y: 500,
              transition: { duration: 1.2 }
            }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <p>Carregando a página</p>
              </div>
              <PuffLoader size={25} color={`rgb(${theme.primary_shade})`} />
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
