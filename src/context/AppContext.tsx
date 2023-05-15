import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useReducer,
} from 'react';
import ThemeContext from './ThemeContext';
import { actions } from '@/data/reducer-actions';
import fetch from '../config/client';
import { NextRouter, useRouter } from 'next/router';
import { Action, State } from '../../@types/reducer';
import type { AppContext } from '../../@types/index';
import reducer, { initialState } from '@/lib/reducer';
import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

interface IContext {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  pageProps: {
    offset: number;
    limit: number;
  };
  setPageProps: Dispatch<
    SetStateAction<{
      offset: number;
      limit: number;
    }>
  >;
  state: State;
  dispatch: Dispatch<Action>;
  logoutUser: () => Promise<void>;
  fetchAPI: (config: AxiosRequestConfig) => AxiosPromise<any>;
}

const context = createContext<IContext>({
  pageProps: {
    offset: 10,
    limit: 10,
  },
  searchValue: '',
  setPageProps: () => {},
  setSearchValue: () => {},
  state: initialState,
  dispatch: () => {},
  logoutUser: async () => {},
  fetchAPI: (): any => {},
});

export default function AppContext(props: AppContext): JSX.Element {
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageProps, setPageProps] = useState({
    offset: 10,
    limit: 10,
  });
  const [searchValue, setSearchValue] = useState<string>('');

  // --------------------------socket---------------------------

  // useEffect(() => {
  //   socket.on(
  //     'disconnect',
  //     useCallback(() => {
  //       dispatch({
  //         type: actions.IS_CONNECTED,
  //         payload: { ...state, isConnected: false },
  //       });
  //     }, [])
  //   );

  //   return () => {
  //     socket.off('disconnect');
  //   };
  // }, []);

  // ----------------user authentication--------------------------
  const fetchAPI = (config: AxiosRequestConfig): AxiosPromise<any> => {
    fetch.interceptors.response.use(
      undefined,
      (err: AxiosError): Promise<never> => {
        if (Number(err.response?.status) > 400) {
          router.push('/auth/sign-in');
        }
        return Promise.reject(err);
      }
    );

    return fetch({
      ...config,
      headers: { authorization: `Bearer ${state.userAuth.token}` },
    });
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/auth/logout',
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: { id: '', token: '', invalidated: false },
        },
      });
      dispatch({
        type: actions.PROMPT_BOX_CONTROL,
      });
      router.push('/auth/sign-in');
    } catch (err: any) {
      console.error(err);
    }
  };

  async function authenticateUser(): Promise<void> {
    try {
      const { data } = await fetch({
        method: 'get',
        url: '/api/v1/auth/refresh',
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
      router.push(`/messenger/main?user=${data?.id}`);
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push('/auth/sign-in');
      }
      console.error(err);
    }
  }

  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  // useEffect(() => {
  //   const revalidateUserAuth = setTimeout(() => {
  //     (async (): Promise<void> => {
  //       try {
  //         const { data } = await fetch({
  //           method: 'get',
  //           url: '/api/v1/auth/refresh',
  //           withCredentials: true,
  //         });
  //         dispatch({
  //           type: actions.USER_AUTH,
  //           payload: {
  //             ...state,
  //             userAuth: {
  //               token: data?.token,
  //               id: data?.id,
  //               invalidated: data?.invalidated,
  //             },
  //           },
  //         });
  //       } catch (err: any) {
  //         if (err.response?.status === 401) {
  //           router.push('/auth/sign-in');
  //         }
  //         console.error(err);
  //       }
  //     })();
  //   }, 1000 * 60 * 9);
  //   return () => clearTimeout(revalidateUserAuth);
  // }, [state.userAuth]);

  return (
    <ThemeContext>
      <context.Provider
        value={{
          pageProps,
          setPageProps,
          searchValue,
          setSearchValue,
          state,
          dispatch,
          logoutUser,
          fetchAPI,
        }}>
        {props.children}
      </context.Provider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
