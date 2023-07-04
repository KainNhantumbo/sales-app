import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  useReducer,
} from 'react';
import fetch from '../config/client';
import ThemeContext from './ThemeContext';
import SocketContext from './SocketContext';
import { actions } from '@/data/actions';
import { NextRouter, useRouter } from 'next/router';
import { Action, State } from '../../@types/reducer';
import { AppContext, TAuth, TCart } from '../../@types/index';
import { reducer, initialState } from '@/lib/reducer';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
    },
  },
});

interface IContext {
  state: State;
  dispatch: Dispatch<Action>;
  logoutPromptController: () => void;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  deleteProductPromptController: (status: boolean, id: string) => void;
  shareProductController: () => void;
  loginPromptController: () => void;
  sortBoxController: () => void;
  cartModalController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  deactivateStorePromptController: () => void;
  userWorkingDataController: () => void;
  addProductToCart: (props: TCart) => void;
  removeProductFromCart: (currentProductId: string) => void;
  updateCartProduct: (props: { productId: string; quantity: number }) => void;
  getCartProduct: (currentProductId: string) => TCart;
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
  cartModalController: () => {},
  sortBoxController: () => {},
  deleteAccountPromptController: () => {},
  deactivateStorePromptController: () => {},
  deleteProductPromptController: () => {},
  deleteCommentPromptController: () => {},
  removeProductFromCart: () => {},
  updateCartProduct: () => {},
  addProductToCart: () => {},
  shareProductController: () => {},
  loginPromptController: () => {},
  userWorkingDataController: () => {},
  getCartProduct: () => ({
    productId: '',
    quantity: 1,
    productName: '',
    price: 0,
    previewImage: undefined,
  }),
});

export default function AppContext(props: AppContext): JSX.Element {
  const CART_KEY: string = 'cart-items';
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  function cartModalController(): void {
    dispatch({
      type: actions.CART_MODAL,
      payload: { ...state, isCartModal: !state.isCartModal },
    });
  }
  function userWorkingDataController(): void {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL,
      payload: {
        ...state,
        isUserWorkingDataModal: !state.isUserWorkingDataModal,
      },
    });
  }
  function deleteAccountPromptController(): void {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT,
      payload: {
        ...state,
        isDeleteAccountPrompt: !state.isDeleteAccountPrompt,
      },
    });
  }
  function deactivateStorePromptController(): void {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT,
      payload: {
        ...state,
        isDeactivateStorePrompt: !state.isDeactivateStorePrompt,
      },
    });
  }

  function logoutPromptController(): void {
    dispatch({
      type: actions.LOGOUT_PROMPT,
      payload: { ...state, isLogoutPrompt: !state.isLogoutPrompt },
    });
  }

  function loginPromptController(): void {
    dispatch({
      type: actions.LOGIN_PROMPT,
      payload: { ...state, isLoginPrompt: !state.isLoginPrompt },
    });
  }

  function searchBoxController(): void {
    dispatch({
      type: actions.SEARCH_BOX_CONTROL,
      payload: { ...state, isSearchActive: !state.isSearchActive },
    });
  }

  function sortBoxController(): void {
    dispatch({
      type: actions.SORT_BOX_CONTROL,
      payload: { ...state, isSortActive: !state.isSortActive },
    });
  }

  function deleteCommentPromptController(status: boolean, id?: string): void {
    dispatch({
      type: actions.DELETE_COMMENT_PROMPT,
      payload: {
        ...state,
        isDeleteCommentPrompt: { status, commentId: id ?? '' },
      },
    });
  }

  function deleteProductPromptController(status: boolean, id?: string): void {
    dispatch({
      type: actions.DELETE_PRODUCT_PROMPT,
      payload: {
        ...state,
        isDeleteProductPrompt: { status, productId: id ?? '' },
      },
    });
  }

  function shareProductController(): void {
    dispatch({
      type: actions.SHARE_PRODUCT_MODAL,
      payload: {
        ...state,
        isShareProductModal: !state.isShareProductModal,
      },
    });
  }

  // ----------------product cart--------------------------
  function getCartProduct(currentProductId: string): TCart {
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
      price: 0,
    };
  }

  function updateCartProduct(props: {
    productId: string;
    quantity: number;
  }): void {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: [
          ...state.cart.map((product) =>
            product.productId === props.productId
              ? { ...product, ...props }
              : product
          ),
        ],
      },
    });
    syncCartToLocalStorage();
  }

  function removeProductFromCart(currentProductId: string): void {
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
                ),
              ],
      },
    });
    syncCartToLocalStorage();
  }

  function addProductToCart(props: TCart): void {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: [...state.cart, { ...props }],
      },
    });
    syncCartToLocalStorage();
  }

  function syncCartToLocalStorage(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  }

  function restoreCartFromLocalStorage(): void {
    const data: TCart[] = JSON.parse(localStorage.getItem(CART_KEY) || `[]`);

    if (data?.length > 0)
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: data },
      });
  }

  useEffect(() => {
    restoreCartFromLocalStorage();
  }, []);

  // -------------user authentication---------------
  async function validateAuth(): Promise<void> {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          auth: { ...data },
        },
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  function fetchAPI(config: AxiosRequestConfig): Promise<AxiosResponse> {
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
      headers: { authorization: `Bearer ${state.auth.token}` },
    });
  }

  const logoutUser = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/auth/default/logout',
        withCredentials: true,
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
            profile_image: '',
          },
        },
      });
      logoutPromptController();
      router.push('/auth/sign-in');
    } catch (err: any) {
      console.error(err);
    }
  };

  async function authenticateUser(): Promise<void> {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          auth: { ...data },
        },
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
      <QueryClientProvider client={queryClient}>
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
            shareProductController,
            addProductToCart,
            removeProductFromCart,
            updateCartProduct,
            getCartProduct,
            cartModalController,
          }}>
          <SocketContext>{props.children}</SocketContext>
        </context.Provider>
      </QueryClientProvider>
    </ThemeContext>
  );
}

export function useAppContext(): IContext {
  return useContext(context);
}
