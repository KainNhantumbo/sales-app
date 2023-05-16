import Image from 'next/image';
import { useState, useEffect } from 'react';
import fetch from '../config/client';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { actions } from '@/data/reducer-actions';
import { IoAt, IoMailOpen } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import newsletter_image from '../../public/assets/newsletter.png';
import { NewsletterContainer as Container } from '../styles/modules/newsletter';

export default function NewsLetter(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState({ status: false, message: '' });

  async function handleEmailSubmition(): Promise<void> {
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/newsletter',
        data: state.newSubscriptorValue,
      });
    } catch (error: any) {
      console.error(error);
      setError({ status: true, message: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  return (
    <Container>
      <h3>
        <span>Conteúdos exclusivos no seu e-mail</span>
      </h3>
      <section>
        <IoMailOpen />
        <Image
          width={800}
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
            {!loading && !error.status && (
              <>
                <input
                  type='email'
                  aria-label='Escreva o seu e-mail'
                  placeholder='Escreva o seu e-mail'
                  autoComplete='true'
                  required={true}
                  value={state.newSubscriptorValue.subscriptor}
                  onChange={(e) =>
                    dispatch({
                      type: actions.NEW_SUBSCRIPTOR_VALUE,
                      payload: {
                        ...state,
                        newSubscriptorValue: { subscriptor: e.target.value },
                      },
                    })
                  }
                />
                <button type='submit' onClick={handleEmailSubmition}>
                  <IoAt />
                  <span>Enviar</span>
                </button>
              </>
            )}

            {error.status && (
              <span className='error-message'>{error.message}</span>
            )}
            {loading && !error.status && (
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
