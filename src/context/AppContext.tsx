import fetch from '@/config/client';
import { initialState, reducer } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { useIsomorphicLayoutEffect } from '@/shared/custom-layout-effect';
import type { Action, State } from '@/types';
import type { Auth, Cart, HttpError } from '@/types/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode
} from 'react';
import ModulesContext from './Modules';
import ThemeContext from './ThemeContext';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always' } }
});

type Props = { children: ReactNode };

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  deleteStoryPromptController: (status: boolean, id: string) => void;
  deleteProductPromptController: (status: boolean, id: string) => void;
  shareProductController: () => void;
  sortBoxController: () => void;
  cartModalController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  deactivateStorePromptController: () => void;
  userWorkingDataController: () => void;
  addProductToCart: (product: Cart) => void;
  removeProductFromCart: (currentProductId: string) => void;
  updateCartProduct: (props: { productId: string; quantity: number }) => void;
  geCartProduct: (currentProductId: string) => Cart;
  httpClient: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
}

const context = createContext<Context>({
  state: initialState,
  dispatch: () => {},
  httpClient: (): any => {},
  searchBoxController: () => {},
  cartModalController: () => {},
  sortBoxController: () => {},
  deleteAccountPromptController: () => {},
  deactivateStorePromptController: () => {},
  deleteProductPromptController: () => {},
  deleteCommentPromptController: () => {},
  deleteStoryPromptController: () => {},
  removeProductFromCart: () => {},
  updateCartProduct: () => {},
  addProductToCart: () => {},
  shareProductController: () => {},
  userWorkingDataController: () => {},
  geCartProduct: () => ({
    productId: '',
    quantity: 1,
    productName: '',
    price: 0,
    previewImage: undefined
  })
});

export default function AppContext(props: Props) {
  const CART_KEY: string = 'cart-items';
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  const cartModalController = () => {
    dispatch({
      type: actions.CART_MODAL,
      payload: { ...state, isCartModal: !state.isCartModal }
    });
  };
  const userWorkingDataController = () => {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL,
      payload: {
        ...state,
        isUserWorkingDataModal: !state.isUserWorkingDataModal
      }
    });
  };
  const deleteAccountPromptController = () => {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT,
      payload: {
        ...state,
        isDeleteAccountPrompt: !state.isDeleteAccountPrompt
      }
    });
  };
  const deactivateStorePromptController = () => {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT,
      payload: {
        ...state,
        isDeactivateStorePrompt: !state.isDeactivateStorePrompt
      }
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
      payload: {
        ...state,
        isDeleteCommentPrompt: { status, commentId: id ?? '' }
      }
    });
  };

  const deleteStoryPromptController = (status: boolean, id?: string) => {
    dispatch({
      type: actions.DELETE_STORY_PROMPT,
      payload: {
        ...state,
        isDeleteStoryPrompt: { status, storyId: id ?? '' }
      }
    });
  };

  const deleteProductPromptController = (status: boolean, id?: string) => {
    dispatch({
      type: actions.DELETE_PRODUCT_PROMPT,
      payload: {
        ...state,
        isDeleteProductPrompt: { status, productId: id ?? '' }
      }
    });
  };

  const shareProductController = () => {
    dispatch({
      type: actions.SHARE_PRODUCT_MODAL,
      payload: {
        ...state,
        isShareProductModal: !state.isShareProductModal
      }
    });
  };

  // ----------------product cart--------------------------
  const geCartProduct = (currentProductId: string): Cart => {
    const foundProduct = state.cart.some(
      (product) => product.productId === currentProductId
    );

    if (foundProduct)
      return state.cart.filter(
        (product) => product.productId === currentProductId
      )[0];
    return {
      productId: '',
      quantity: 1,
      productName: '',
      previewImage: undefined,
      price: 0
    };
  };

  const updateCartProduct = (props: {
    productId: string;
    quantity: number;
  }) => {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: [
          ...state.cart.map((product) =>
            product.productId === props.productId
              ? { ...product, ...props }
              : product
          )
        ]
      }
    });
  };

  const removeProductFromCart = (currentProductId: string) => {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart:
          state.cart.length < 2
            ? []
            : [
                ...state.cart.filter(
                  (product) => product.productId !== currentProductId
                )
              ]
      }
    });
  };

  const addProductToCart = (product: Cart) => {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: [...state.cart, { ...product }]
      }
    });
  };

  const syncCartToLocalStorage = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  };

  useEffect(() => {
    syncCartToLocalStorage();
  }, [state.cart]);

  useIsomorphicLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);

  const restoreCartFromLocalStorage = () => {
    const data: Cart[] = JSON.parse(localStorage.getItem(CART_KEY) || `[]`);

    if (data?.length > 0)
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: data }
      });
  };

  const validateAuth = async () => {
    try {
      const { data } = await fetch<Auth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: { ...state, auth: { ...data } }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      );
    }
  };

  async function httpClient<T>(config: AxiosRequestConfig) {
    fetch.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error?.response?.status);
        if (status > 400 && status < 404) {
          validateAuth().catch((error) => {
            console.error(
              (error as HttpError).response?.data?.message ||
                (error as HttpError).message
            );
            router.push('/auth/sign-in');
          });
        }
        return Promise.reject(error);
      }
    );
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
      dispatch({
        type: actions.USER_AUTH,
        payload: { ...state, auth: { ...data } }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      );
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        validateAuth();
      },
      1000 * 60 * 4
    );
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
            shareProductController,
            addProductToCart,
            removeProductFromCart,
            updateCartProduct,
            geCartProduct,
            cartModalController
          }}>
          <ModulesContext>{props.children}</ModulesContext>
        </context.Provider>
      </QueryClientProvider>
    </ThemeContext>
  );
}

export function useAppContext() {
  return useContext(context);
}
