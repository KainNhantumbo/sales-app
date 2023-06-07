import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { complements } from '@/data/app-data';
import { AnimatePresence, motion } from 'framer-motion';
import { CookiesPopupContainer as Container } from '../styles/common/cookies-popup';

export default function CookiesPopup(): JSX.Element {
  const [privacyAdvisor, setprivacyAdvisor] = useState<boolean>();

  // controls the life cicle of the component
  const advisorController = () => {
    setprivacyAdvisor(() => false);
    localStorage.setItem('privacy_advisor', JSON.stringify('false'));
  };

  useEffect(() => {
    // advisor management
    const advisorState = JSON.parse(
      localStorage.getItem('privacy_advisor') || 'false'
    );
    if (!advisorState) {
      localStorage.setItem('privacy_advisor', JSON.stringify('true'));
      setprivacyAdvisor(() => true);
    }
    if (advisorState === 'true') {
      setprivacyAdvisor(() => true);
    } else {
      setprivacyAdvisor(() => false);
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
              transition: {
                duration: 1.2
              }
            }}
            exit={{
              opacity: 0,
              y: 500,
              transition: {
                duration: 1.2
              }
            }}
            className='advisor'>
            <div>
              <p>
                Nosso site utiliza cookies para te proporcionar uma melhor
                experiência. Ao acessar o site da {complements.defaultTitle},
                você concorda com a nossa{'  '}
                <Link href='/legal/privacy-policy'>
                  <strong>Política de Privacidade e Cookies</strong>
                </Link>
                .
              </p>
              <button onClick={advisorController}>
                <IoCheckmark />
                <span>Sim, compreendo.</span>
              </button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
