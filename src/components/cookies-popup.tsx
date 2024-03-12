import { constants } from '@/data/constants';
import { AnimatePresence, m as motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { _cookies as Container } from '../styles/modules/cookies-popup';

export default function CookiesPopup() {
  const [privacyAdvisor, setPrivacyAdvisor] = useState<boolean>();

  const advisorController = () => {
    setPrivacyAdvisor(() => false);
    localStorage.setItem('privacy_advisor', JSON.stringify('false'));
  };

  useEffect(() => {
    const advisorState = JSON.parse(localStorage.getItem('privacy_advisor') || 'false');
    if (!advisorState) {
      localStorage.setItem('privacy_advisor', JSON.stringify('true'));
      setPrivacyAdvisor(() => true);
    }
    if (advisorState === 'true') {
      setPrivacyAdvisor(() => true);
    } else {
      setPrivacyAdvisor(() => false);
    }
  }, []);

  return (
    <AnimatePresence>
      {privacyAdvisor && (
        <Container>
          <motion.section
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
            }}
            className='advisor'>
            <div>
              <p>
                Nosso site utiliza cookies para te proporcionar uma melhor experiência. Ao
                acessar o site da {constants.defaultTitle}, você concorda com a nossa{'  '}
                <Link href='/legal/privacy'>
                  <strong>Política de Privacidade e Cookies</strong>
                </Link>
                .
              </p>
              <button onClick={advisorController}>
                <span>Sim, compreendo.</span>
              </button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
