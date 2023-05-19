import { IoMailOutline } from 'react-icons/io5';
import fetch from '../../config/client';
import { useState, useEffect } from 'react';
import { SubmitEvent } from '../../../@types';
import { PasswordReseterContainer as Container } from '../../styles/common/pasword-reseter';
import { complements } from '@/data/app-data';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';

export default function ResetPassword(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [email, setEmail] = useState<string>('');
  const theme = useTheme();
  const router: NextRouter = useRouter();

  async function handleSubmit(e: SubmitEvent): Promise<void> {
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
    <Layout>
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
                  <span>Confirmar</span>
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
        <footer>
          &copy; {complements.defaultTitle} |{' '}
          <Link href={'/legal/privacy-policy'}>
            <span>Política de Privacidade</span>
          </Link>
        </footer>
      </Container>
    </Layout>
  );
}