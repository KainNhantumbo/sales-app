import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoLogInOutline,
  IoMailOutline,
} from 'react-icons/io5';
import fetchClient from '../../config/client';
import { actions } from '../../data/reducer-actions';
import { useState } from 'react';
import { ISignInData } from '../../../@types/index';
import { useAppContext } from '../../context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import { InputEvents, SubmitEvent } from '../../../@types';
import { SignInContainer as Container } from '../../styles/common/sign-in';
import { complements } from '@/data/app-data';

export default function Signin(): JSX.Element {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState<ISignInData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router: NextRouter = useRouter();

  const handleChange = (e: InputEvents): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (formData.password.length < 6)
      return handleError('Password must have at least 6 characters');
    try {
      const { data } = await fetchClient({
        method: 'post',
        url: '/auth/login',
        data: formData,
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: {
            token: data?.token,
            id: data?.id,
            invalidated: data?.invalidated,
          },
        },
      });
      router.push(`/`);
    } catch (err: any) {
      console.log(err);
      handleError(err.response?.data?.message);
    }
  };

  const handleError = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <Container>
      <main>
        <article>
          <div className='form-container'>
            <h2>Normies CMS</h2>
            <form onSubmit={handleSubmit}>
              <section className='input-field'>
                <IoMailOutline />
                <input
                  type='email'
                  name='email'
                  placeholder='Escreva o seu e-mail'
                  aria-label='Escreva o seu e-mail'
                  required
                  onChange={(e): void => handleChange(e)}
                />
              </section>

              <section className='input-field'>
                <IoLockClosedOutline />
                <input
                  type='password'
                  name='password'
                  placeholder='Escreva a sua senha'
                  aria-label='Escreva a sua senha'
                  onChange={(e): void => handleChange(e)}
                />
              </section>

              <span className='error-message'>{errorMessage}</span>
              <section className='actions'>
                <button className='login' type='submit'>
                  <IoLockOpenOutline />
                  <span>Login</span>
                </button>
                <button
                  className='register'
                  onClick={(): Promise<boolean> =>
                    router.push('/auth/sign-up')
                  }>
                  <IoLogInOutline />
                  <span>Signup</span>
                </button>
              </section>
            </form>
          </div>
        </article>
      </main>
      <footer>&copy; {complements.copyrightSentence}</footer>
    </Container>
  );
}
