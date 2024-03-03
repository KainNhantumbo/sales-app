import Layout from '@/components/Layout';
import fetch from '@/config/client';
import { complements } from '@/data/data';
import { _resetPassword as Container } from '@/styles/common/pasword-reseter';
import { HttpError, InputEvents, SubmitEvent } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function UpdatePassword() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [passwords, setPasswords] = useState({
    password: '',
    confirm_password: ''
  });

  const handleChange = (e: InputEvents) => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm_password)
      return setError({
        status: true,
        message: 'A as senhas devem ser iguais e maiores que 8 carácteres.'
      });

    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/auth/update-password',
        data: passwords.password,
        withCredentials: true
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      );
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
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Criar uma nova senha</h2>
              <p>
                A sua nova senha deve ser diferente das senhas utilizadas
                anteriormente.
              </p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='password'>
                    <IoLockOpenOutline />
                    <span>Nova senha</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    minLength={8}
                    aria-hidden='true'
                    placeholder='Escreva a sua nova senha'
                    aria-label='Escreva a sua nova senha'
                    onChange={(e) => handleChange(e)}
                  />
                </section>
                <section className='input-field'>
                  <label htmlFor='confirm_password'>
                    <IoLockClosedOutline />
                    <span>Confirme a senha</span>
                  </label>
                  <input
                    type='password'
                    id='confirm_password'
                    name='confirm_password'
                    aria-hidden='true'
                    minLength={8}
                    placeholder='Confirme a sua senha'
                    aria-label='Confirme a sua senha'
                    onChange={(e) => handleChange(e)}
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
                        margin: '0 auto'
                      }}
                    />
                  </>
                )}

                <button
                  className='login'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Recuperar conta</span>
                </button>
              </form>
            </div>
          </article>
        </main>
        <section className='base-container'>
          &copy; {complements.defaultTitle} |{' '}
          <Link href={'/legal/privacy'}>
            <span>Política de Privacidade</span>
          </Link>
        </section>
      </Container>
    </Layout>
  );
}
