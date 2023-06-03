import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  useReducer
} from 'react';
import fetch from '../config/client';
import ThemeContext from './ThemeContext';
import SocketContext from './SocketContext';
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
  shareProductController: (status: boolean, id: string) => void;
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
  deleteProductPromptController: () => {},
  deleteCommentPromptController: () => {},
  shareProductController: () => {},
  loginPromptController: () => {},
  userWorkingDataController: () => {}
});

export default function AppContext(props: AppContext) {
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  function userWorkingDataController(): void {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL,
      payload: {
        ...state,
        isUserWorkingDataModal: !state.isUserWorkingDataModal
      }
    });
  }
  function deleteAccountPromptController(): void {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT,
      payload: { ...state, isDeleteAccountPrompt: !state.isDeleteAccountPrompt }
    });
  }
  function deactivateStorePromptController(): void {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT,
      payload: {
        ...state,
        isDeactivateStorePrompt: !state.isDeactivateStorePrompt
      }
    });
  }

  function logoutPromptController(): void {
    dispatch({
      type: actions.LOGOUT_PROMPT,
      payload: { ...state, isLogoutPrompt: !state.isLogoutPrompt }
    });
  }

  function loginPromptController(): void {
    dispatch({
      type: actions.LOGIN_PROMPT,
      payload: { ...state, isLoginPrompt: !state.isLoginPrompt }
    });
  }

  function searchBoxController(): void {
    dispatch({
      type: actions.SEARCH_BOX_CONTROL,
      payload: { ...state, isSearchActive: !state.isSearchActive }
    });
  }

  function sortBoxController(): void {
    dispatch({
      type: actions.SORT_BOX_CONTROL,
      payload: { ...state, isSortActive: !state.isSortActive }
    });
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

  function shareProductController(status: boolean, id?: string): void {
    dispatch({
      type: actions.SHARE_PRODUCT_MODAL,
      payload: {
        ...state,
        isShareProductModal: { status, productId: id ?? '' }
      }
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
          deactivateStorePromptController,
          shareProductController
        }}>
        <SocketContext>{props.children}</SocketContext>
      </context.Provider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
