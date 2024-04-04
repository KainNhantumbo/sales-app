import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { HttpError } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { BsMailbox2 } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import newsletter_image from '../../public/assets/newsletter.png';
import fetch from '../config/client';
import { _newsletter as Container } from '../styles/modules/newsletter';

export function NewsLetter() {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailSubmission = async () => {
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
      toast.success('Inscreveu-se a newsletter com sucesso.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            desenvolvimento da nossa plataforma, dicas sobre e-commerce, novos produtos e
            algumas coisinhas a mais.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {!loading && (
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
                <button type='submit' onClick={handleEmailSubmission}>
                  <span>Inscrever</span>
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
