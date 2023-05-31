import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  useReducer
} from 'react';
import fetch from '../config/client';
import ThemeContext from './ThemeContext';
import { actions } from '@/data/actions';
import { NextRouter, useRouter } from 'next/router';
import { Action, State } from '../../@types/reducer';
import type { AppContext } from '../../@types/index';
import reducer, { initialState } from '@/lib/reducer';
import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';

interface IContext {
  state: State;
  dispatch: Dispatch<Action>;
  logoutPromptController: () => void;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  loginPromptController: () => void;
  sortBoxController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  userWorkingDataController: () => void;
  logoutUser: () => Promise<void>;
  fetchAPI: (config: AxiosRequestConfig) => AxiosPromise<any>;
}

const context = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
  logoutUser: async () => {},
  fetchAPI: (): any => {},
  logoutPromptController: () => {},
  searchBoxController: () => {},
  sortBoxController: () => {},
  deleteAccountPromptController: () => {},
  deleteCommentPromptController: (status: boolean, id: string) => {},
  loginPromptController: () => {},
  userWorkingDataController: () => {}
});

export default function AppContext(props: AppContext): JSX.Element {
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  function deleteAccountPromptController(): void {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT
    });
  }

  function logoutPromptController(): void {
    dispatch({
      type: actions.LOGOUT_PROMPT
    });
  }

  function loginPromptController(): void {
    dispatch({
      type: actions.LOGIN_PROMPT
    });
  }

  function searchBoxController(): void {
    dispatch({ type: actions.SEARCH_BOX_CONTROL });
  }

  function sortBoxController(): void {
    dispatch({ type: actions.SORT_BOX_CONTROL });
  }

  function deleteCommentPromptController(status: boolean, id?: string): void {
    dispatch({
      type: actions.DELETE_COMMENT_PROMPT,
      payload: {
        ...state,
        isDeleteCommentPrompt: { status, commentId: id || '' }
      }
    });
  }

  function userWorkingDataController(): void {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL
    });
  }

  // ----------------user authentication--------------------------
  function fetchAPI(config: AxiosRequestConfig): AxiosPromise<any> {
    fetch.interceptors.response.use(
      undefined,
      (err: AxiosError): Promise<never> => {
        const status = Number(err.response?.status);
        if (status > 400 && status < 404) {
          router.push('/auth/sign-in');
        }
        return Promise.reject(err);
      }
    );

    return fetch({
      ...config,
      headers: { authorization: `Bearer ${state.userAuth.token}` }
    });
  }

  const logoutUser = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/auth/default/logout',
        withCredentials: true
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: {
            id: '',
            name: '',
            token: '',
            email: '',
            profile_image: '',
            invalidated: false
          }
        }
      });
      logoutPromptController();
      router.push('/auth/sign-in');
    } catch (err: any) {
      console.error(err);
    }
  };

  async function authenticateUser(): Promise<void> {
    try {
      const { data } = await fetch({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: {
            id: data?.id,
            token: data?.token,
            invalidated: data?.invalidated,
            email: data?.email,
            name: data?.name,
            profile_image: data?.profile_image
          }
        }
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    const revalidateUserAuth = setTimeout((): void => {
      (async function (): Promise<void> {
        try {
          const { data } = await fetch({
            method: 'get',
            url: '/api/v1/auth/default/refresh',
            withCredentials: true
          });
          dispatch({
            type: actions.USER_AUTH,
            payload: {
              ...state,
              userAuth: {
                id: data?.id,
                token: data?.token,
                invalidated: data?.invalidated,
                email: data?.email,
                name: data?.name,
                profile_image: data?.profile_image
              }
            }
          });
        } catch (err: any) {
          dispatch({
            type: actions.USER_AUTH,
            payload: {
              ...state,
              userAuth: {
                id: '',
                name: '',
                token: '',
                email: '',
                profile_image: '',
                invalidated: false
              }
            }
          });
          console.error(err);
        }
      })();
    }, 1000 * 60 * 4);
    return () => clearTimeout(revalidateUserAuth);
  }, [state.userAuth]);

  return (
    <ThemeContext>
      <context.Provider
        value={{
          state,
          fetchAPI,
          dispatch,
          logoutUser,
          loginPromptController,
          logoutPromptController,
          userWorkingDataController,
          deleteCommentPromptController,
          deleteAccountPromptController,
          searchBoxController,
          sortBoxController
        }}>
        {props.children}
      </context.Provider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
