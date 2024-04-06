import Layout from '@/components/layout';
import fetch from '@/config/client';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _resetPassword as Container } from '@/styles/common/password-reset';
import type { HttpError, SubmitEvent } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/auth/request-new-password',
        data: email
      });
      router.push('/auth/reset-password-confirmation');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Atualização de Senha`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Redefinir a sua senha</h2>
              <p>
                Coloque o e-mail associado com a sua conta de usuário e enviaremos um e-mail
                para você com as instruções de redefinição de senha.
              </p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='email'>
                    <IoMailOutline />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Escreva o seu e-mail'
                    aria-label='Escreva o seu e-mail'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </section>

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

                <button type='submit' disabled={loading}>
                  Enviar e-mail
                </button>
              </form>

              <div className='sign-in-options'>
                <div className='signup-request'>
                  Ainda não tem uma conta?
                  <Link href={'/auth/sign-up'}>
                    <span> Criar conta.</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>
        <section className='base-container'>
          &copy; {constants.defaultTitle} |{' '}
          <Link href={'/legal/privacy'}>
            <span>Política de Privacidade</span>
          </Link>
        </section>
      </Container>
    </Layout>
  );
}
