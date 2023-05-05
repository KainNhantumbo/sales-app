import { useDetectAdBlock } from 'adblock-detect-react';
import { AdBlockerPopupContainer as Container } from '@/styles/common/ad-blocker-popup';
import { FaAd } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { IoPlanet } from 'react-icons/io5';

export default function AdBlockerPopup(): JSX.Element {
  const isAddBlockEnabled = useDetectAdBlock();

  return (
    <>
      <Container>
        {isAddBlockEnabled && (
          <section className='advisor'>
            <div>
              <FaAd className='cookie-icon' />
              <p>
                We use cookies (e.g. personalisation, ads, analytics, social
                media)
              </p>
              <button onClick={() => useRouter().reload()}>
                <IoPlanet />
                <span>Continue browsing</span>
              </button>
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
