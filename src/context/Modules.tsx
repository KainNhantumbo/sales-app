import { constants } from '@/data/constants';
import { actions } from '@/shared/actions';
import type { HttpError } from '@/types';
import { useRouter } from 'next/router';
import { type ReactNode, createContext, useContext } from 'react';
import { useAppContext } from './AppContext';
import { initialState } from '@/lib/reducer';

type Props = { children: ReactNode };

type Context = {
  logoutUser: () => void;
  requestLogin: () => void;
};

const context = createContext<Context>({
  logoutUser: () => {},
  requestLogin: () => {}
});

export function ModulesContext({ children }: Props) {
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();

  function requestLogin() {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          title: `${constants.defaultTitle} | Iniciar sessão`,
          message: 'Você precisa iniciar sessão para continuar.',
          actionButtonMessage: 'Iniciar sessão',
          handleFunction: () => {
            dispatch({
              type: actions.PROMPT,
              payload: {
                ...state,
                prompt: { ...state.prompt, status: false }
              }
            });
            router.push('/auth/sign-in');
          }
        }
      }
    });
  }

  function logoutUser() {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          title: 'Terminar sessão',
          message: 'Você realmente gostaria de terminar esta sessão e sair?',
          actionButtonMessage: 'Confirmar',
          handleFunction: async () => {
            try {
              await httpClient({
                method: 'post',
                url: '/api/v1/auth/default/logout',
                withCredentials: true
              });
              dispatch({
                type: actions.USER_AUTH,
                payload: { ...state, auth: initialState.auth }
              });

              router.push('/auth/sign-in');
            } catch (error) {
              console.error((error as HttpError).response?.data?.message || error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
            }
          }
        }
      }
    });
  }

  return (
    <context.Provider value={{ logoutUser, requestLogin }}>{children}</context.Provider>
  );
}

export function useModulesContext() {
  return useContext(context);
}
