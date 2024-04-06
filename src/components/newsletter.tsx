import { blurDataUrlImage } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { HttpError } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { BsMailbox2 } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import newsletter_image from '../../public/assets/newsletter.png';
import client from '../config/client';
import { _newsletter as Container } from '../styles/modules/newsletter';

export function NewsLetter() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const onSubmit = async () => {
    try {
      setLoading(true);
      await client({ method: 'post', url: '/api/v1/users/newsletter', data: inputValue });
      setInputValue('');
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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type='submit' onClick={onSubmit}>
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
