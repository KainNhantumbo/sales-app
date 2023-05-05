import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaCookieBite } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { CookiesPopupContainer as Container } from '../styles/common/cookies-popup';

const CookiesPopup = (): JSX.Element => {
  const [privacyAdvisor, setprivacyAdvisor] = useState<boolean>();

  // controls the state of privacy advisor message
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
    <Container>
      {privacyAdvisor && (
        <section className='advisor'>
          <div>
            <FaCookieBite className='cookie-icon' />
            <p>
              We use cookies (e.g. personalisation, ads, analytics, social
              media).{' '}
              <Link href='/privacy-policy'>
                <strong>Find out more</strong>
              </Link>
            </p>
            <button onClick={advisorController}>
              <IoCheckmark />
              <span>Agree</span>
            </button>
          </div>
        </section>
      )}
    </Container>
  );
};

export default CookiesPopup;
