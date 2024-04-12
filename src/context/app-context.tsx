import client from '@/config/client';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState, reducer } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import type { Action, Auth, HttpError, State } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';
import { ThemeContext } from './theme-context';

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always', refetchOnWindowFocus: false } }
});

type Context = {
  logoutUser: () => void;
  requestLogin: () => void;
  state: State;
  dispatch: React.Dispatch<Action>;
  httpClient: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
};

const context = React.createContext<Context>({
  state: initialState,
  logoutUser: () => {},
  requestLogin: () => {},
  dispatch: () => {},
  httpClient: (): any => {}
});

export function AppContext(props: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const validateAuth = async () => {
    try {
      const { data } = await client<Auth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({ type: actions.USER_AUTH, payload: { ...state, auth: { ...data } } });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message, statusCode } = errorTransformer(error as HttpError);
        console.error('Error message:', message);
        console.error('Error code:', statusCode);
      }
      console.error(error);
    }
  };

  async function httpClient<T>(config: AxiosRequestConfig) {
    client.interceptors.response.use(undefined, (error: AxiosError): Promise<never> => {
      const status = Number(error.status);
      if (status > 400 && status < 404) {
        validateAuth().catch((error) => {
          if (error instanceof AxiosError) {
            const { message, statusCode } = errorTransformer(error as HttpError);
            console.error('Error message:', message);
            console.error('Error code:', statusCode);
          }
          console.error(error);
          router.push('/auth/sign-in');
        });
      }
      return Promise.reject(error);
    });
    return await client<T>({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` }
    });
  }

  const authenticateUser = async () => {
    try {
      const { data } = await client<Auth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({ type: actions.USER_AUTH, payload: { ...state, auth: { ...data } } });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message, statusCode } = errorTransformer(error as HttpError);
        console.error('Error message:', message);
        console.error('Error code:', statusCode);
      }
      console.error(error);
    }
  };

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
              payload: { ...state, prompt: { ...state.prompt, status: false } }
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
              const { message } = errorTransformer(error as HttpError);
              console.error(error);
              toast.error(message);
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

  React.useEffect(() => {
    authenticateUser();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => validateAuth(), 1000 * 60 * 4);
    return () => clearTimeout(timer);
  }, [state.auth]);

  return (
    <ThemeContext>
      <QueryClientProvider client={queryClient}>
        <context.Provider value={{ state, httpClient, dispatch, logoutUser, requestLogin }}>
          {props.children}
        </context.Provider>
      </QueryClientProvider>
    </ThemeContext>
  );
}

export function useAppContext() {
  return React.useContext(context);
}
