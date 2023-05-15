import { IoAt, IoMailOpen } from 'react-icons/io5';
import { useState } from 'react';
import { NewsletterContainer as Container } from '../styles/modules/newsletter';
import { ClipLoader, PulseLoader } from 'react-spinners';
import newsletter_image from '../../public/assets/newsletter.jpg';
import Image from 'next/image';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';

export default function NewsLetter(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchAPI } = useAppContext();
  const theme = useTheme();

  async function handleEmailSubmition() {}

  return (
    <Container>
      <h3>
        <span>Conteúdos exclusivos no seu e-mail</span>
      </h3>
      <section>
        <IoMailOpen />
        <Image
          width={1200}
          height={800}
          src={newsletter_image}
          alt='newsletter image by freepick'
        />
        <div>
          <p>
            Receba um e-mail por semana, com as mais relevantes notícias sobre o
            desenvolvimento da nossa plataforma, dicas sobre e-commerce, novos
            produtos e algumas coisinhas a mais.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {!loading && (
              <>
                <input
                  type='email'
                  aria-label='Escreva o seu e-mail'
                  placeholder='Escreva o seu e-mail'
                  autoComplete='true'
                  required={true}
                />
                <button type='submit' onClick={handleEmailSubmition}>
                  <IoAt />
                  <span>Enviar</span>
                </button>
              </>
            )}
            {loading && (
              <>
                <PulseLoader
                  color={`rgb(${theme.primary})`}
                  loading={loading}
                  aria-placeholder='Processando...'
                  cssOverride={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </>
            )}
          </form>
        </div>
      </section>
    </Container>
  );
}
