import Image from 'next/image';
import fetch from '../config/client';
import { actions } from '@/data/actions';
import { BsMailbox2 } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { useState, useEffect, FC } from 'react';
import { blurDataUrlImage } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { DefaultTheme, useTheme } from 'styled-components';
import newsletter_image from '../../public/assets/newsletter.png';
import { _newsletter as Container } from '../styles/modules/newsletter';

const NewsLetter: FC = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  });

  const handleEmailSubmition = async (): Promise<void> => {
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/newsletter',
        data: state.newSubscriptorValue,
      });
      dispatch({
        type: actions.NEW_SUBSCRIPTOR_VALUE,
        payload: {
          ...state,
          newSubscriptorValue: { subscriptor: '' },
        },
      });
      setError({
        status: true,
        message: 'Inscreveu-se a newsletter com sucesso.',
      });
    } catch (error: any) {
      console.error(error);
      setError({ status: true, message: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): (() => void) => {
    const debounceTime = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return (): void => {
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
                  <IoPaperPlaneOutline />
                  <span>Inscrever-se</span>
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
};

export default NewsLetter;
