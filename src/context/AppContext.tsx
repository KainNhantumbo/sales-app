import fetch from '@/config/client';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState, reducer } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import type { Action, Auth, HttpError, State } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ModulesContext } from './Modules';
import { ThemeContext } from './ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always', refetchOnWindowFocus: false } }
});

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  deleteStoryPromptController: (status: boolean, id: string) => void;
  deleteProductPromptController: (status: boolean, id: string) => void;
  shareProductController: () => void;
  sortBoxController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  deactivateStorePromptController: () => void;
  userWorkingDataController: () => void;
  httpClient: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
};

const context = React.createContext<Context>({
  state: initialState,
  dispatch: () => {},
  httpClient: (): any => {},
  searchBoxController: () => {},
  sortBoxController: () => {},
  deleteAccountPromptController: () => {},
  deactivateStorePromptController: () => {},
  deleteProductPromptController: () => {},
  deleteCommentPromptController: () => {},
  deleteStoryPromptController: () => {},
  shareProductController: () => {},
  userWorkingDataController: () => {}
});

export function AppContext(props: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  const userWorkingDataController = () => {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL,
      payload: { ...state, isUserWorkingDataModal: !state.isUserWorkingDataModal }
    });
  };
  const deleteAccountPromptController = () => {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT,
      payload: { ...state, isDeleteAccountPrompt: !state.isDeleteAccountPrompt }
    });
  };
  const deactivateStorePromptController = () => {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT,
      payload: { ...state, isDeactivateStorePrompt: !state.isDeactivateStorePrompt }
    });
  };

  const searchBoxController = () => {
    dispatch({
      type: actions.SEARCH_BOX_CONTROL,
      payload: { ...state, isSearchActive: !state.isSearchActive }
    });
  };

  const sortBoxController = () => {
    dispatch({
      type: actions.SORT_BOX_CONTROL,
      payload: { ...state, isSortActive: !state.isSortActive }
    });
  };

  const deleteCommentPromptController = (status: boolean, id?: string) => {
    dispatch({
      type: actions.DELETE_COMMENT_PROMPT,
      payload: { ...state, isDeleteCommentPrompt: { status, commentId: id ?? '' } }
    });
  };

  const deleteStoryPromptController = (status: boolean, id?: string) => {
    dispatch({
      type: actions.DELETE_STORY_PROMPT,
      payload: { ...state, isDeleteStoryPrompt: { status, storyId: id ?? '' } }
    });
  };

  const deleteProductPromptController = (status: boolean, id?: string) => {
    dispatch({
      type: actions.DELETE_PRODUCT_PROMPT,
      payload: { ...state, isDeleteProductPrompt: { status, productId: id ?? '' } }
    });
  };

  const shareProductController = () => {
    dispatch({
      type: actions.SHARE_PRODUCT_MODAL,
      payload: { ...state, isShareProductModal: !state.isShareProductModal }
    });
  };

  const validateAuth = async () => {
    try {
      const { data } = await fetch<Auth>({
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
    fetch.interceptors.response.use(undefined, (error: AxiosError): Promise<never> => {
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
    return await fetch<T>({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` }
    });
  }

  const authenticateUser = async () => {
    try {
      const { data } = await fetch<Auth>({
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
        <context.Provider
          value={{
            state,
            httpClient,
            dispatch,
            sortBoxController,
            searchBoxController,
            userWorkingDataController,
            deleteCommentPromptController,
            deleteProductPromptController,
            deleteAccountPromptController,
            deactivateStorePromptController,
            deleteStoryPromptController,
            shareProductController
          }}>
          <ModulesContext>{props.children}</ModulesContext>
        </context.Provider>
      </QueryClientProvider>
    </ThemeContext>
  );
}

export function useAppContext() {
  return React.useContext(context);
}
