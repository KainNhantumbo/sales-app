import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage } from '@/data/data';
import { actions } from '@/shared/actions';
import { HttpError } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsMailbox2 } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import newsletter_image from '../../public/assets/newsletter.png';
import fetch from '../config/client';
import { _newsletter as Container } from '../styles/modules/newsletter';

export default function NewsLetter() {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: ''
  });

  const handleEmailSubmition = async () => {
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/newsletter',
        data: state.newSubscriptionValue
      });
      dispatch({
        type: actions.NEW_subscription_VALUE,
        payload: {
          ...state,
          newSubscriptionValue: { subscription: '' }
        }
      });
      setError({
        status: true,
        message: 'Inscreveu-se a newsletter com sucesso.'
      });
    } catch (error) {
      console.error(error);
      setError({
        status: true,
        message:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => {
      clearTimeout(debounceTime);
    };
  }, [error.status]);

  return (
    <Container>
      <h3>
        <span>Conteúdos exclusivos no seu e-mail</span>
      </h3>
      <section>
        <BsMailbox2 />
        <Image
          width={800}
          height={800}
          priority
          blurDataURL={blurDataUrlImage}
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
                  value={state.newSubscriptionValue.subscription}
                  onChange={(e) =>
                    dispatch({
                      type: actions.NEW_subscription_VALUE,
                      payload: {
                        ...state,
                        newSubscriptionValue: { subscription: e.target.value }
                      }
                    })
                  }
                />
                <button type='submit' onClick={handleEmailSubmition}>
                  <span>Inscrever</span>
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
                    margin: '0 auto'
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
