import actions from '@/shared/actions';
import { complements } from '@/shared/data';
import { FetchError } from '@/types';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext } from 'react';
import { useAppContext } from './AppContext';

type Props = { children: ReactNode };

type Context = {
  logoutUser: () => void;
  requestLogin: () => void;
};

const context = createContext<Context>({
  logoutUser: () => {},
  requestLogin: () => {}
});

export default function ModulesContext(props: Props) {
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();

  function requestLogin() {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          title: `${complements.defaultTitle} | Iniciar sessão`,
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
                payload: {
                  ...state,
                  auth: {
                    id: '',
                    name: '',
                    storeId: '',
                    token: '',
                    email: '',
                    profile_image: ''
                  }
                }
              });

              router.push('/auth/sign-in');
            } catch (error) {
              console.error(
                (error as FetchError).response?.data?.message || error
              );
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
            }
          }
        }
      }
    });
  }

  return (
    <context.Provider value={{ logoutUser, requestLogin }}>
      {props.children}
    </context.Provider>
  );
}

export function useModulesContext() {
  return useContext(context);
}
