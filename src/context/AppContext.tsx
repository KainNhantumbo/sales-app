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
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IContext {
  state: State;
  dispatch: Dispatch<Action>;
  logoutPromptController: () => void;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  deleteProductPromptController: (status: boolean, id: string) => void;
  loginPromptController: () => void;
  sortBoxController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  deactivateStorePromptController: () => void;
  userWorkingDataController: () => void;
  logoutUser: () => Promise<void>;
  fetchAPI: (config: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>;
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
  deactivateStorePromptController: () => {},
  deleteProductPromptController: (status: boolean, id: string) => {},
  deleteCommentPromptController: (status: boolean, id: string) => {},
  loginPromptController: () => {},
  userWorkingDataController: () => {}
});

export default function AppContext(props: AppContext) {
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  function deleteAccountPromptController(): void {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT
    });
  }

  function deactivateStorePromptController(): void {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT
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
        isDeleteCommentPrompt: { status, commentId: id ?? '' }
      }
    });
  }

  function deleteProductPromptController(status: boolean, id?: string): void {
    dispatch({
      type: actions.DELETE_PRODUCT_PROMPT,
      payload: {
        ...state,
        isDeleteProductPrompt: { status, productId: id ?? '' }
      }
    });
  }

  function userWorkingDataController(): void {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL
    });
  }

  // ----------------user authentication--------------------------
  async function validateAuth(): Promise<void> {
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
          auth: {
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
          auth: {
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
  }

  function fetchAPI(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<any, any>> {
    fetch.interceptors.response.use(
      undefined,
      (err: AxiosError): Promise<never> => {
        const status = Number(err.response?.status);
        if (status > 400 && status < 404) {
          validateAuth().catch((err) => {
            console.error(err);
            router.push('/auth/sign-in');
          });
        }
        return Promise.reject(err);
      }
    );
    return fetch({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` }
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
          auth: {
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
          auth: {
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

  useEffect((): void => {
    authenticateUser();
  }, []);

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      validateAuth();
    }, 1000 * 60 * 4);
    return () => clearTimeout(timer);
  }, [state.auth]);

  return (
    <ThemeContext>
      <context.Provider
        value={{
          state,
          fetchAPI,
          dispatch,
          logoutUser,
          sortBoxController,
          searchBoxController,
          loginPromptController,
          logoutPromptController,
          userWorkingDataController,
          deleteCommentPromptController,
          deleteProductPromptController,
          deleteAccountPromptController,
          deactivateStorePromptController
        }}>
        {props.children}
      </context.Provider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
