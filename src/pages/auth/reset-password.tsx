import Link from 'next/link';
import { NextPage } from 'next';
import fetch from '../../config/client';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { SubmitEvent } from '../../../@types';
import { IoMailOutline } from 'react-icons/io5';
import { complements } from '@/data/app-data';
import { PulseLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { _resetPassword as Container } from '@/styles/common/pasword-reseter';

const ResetPassword: NextPage = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/auth/request-new-password',
        data: email,
        withCredentials: true,
      });
      router.push('/auth/reset-password-confirmation');
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      setError({
        status: true,
        message: error?.response?.data?.message ?? error?.code,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => clearTimeout(debounceTimer);
  }, [error.status]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Atualização de Senha`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Redifinir a sua senha</h2>
              <p>
                Coloque o e-mail associado com a sua conta de usuário e
                enviaremos um e-mail para você com as instruções de redifinição
                de senha.
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
                    onChange={(e): void => setEmail(e.target.value)}
                  />
                </section>

                {error.status && !loading && (
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

                <button
                  className='login'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Enviar e-mail</span>
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
          &copy; {complements.defaultTitle} |{' '}
          <Link href={'/legal/privacy-policy'}>
            <span>Política de Privacidade</span>
          </Link>
        </section>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
