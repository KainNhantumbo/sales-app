import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  useReducer,
  ReactNode,
  FC,
} from 'react';
import fetch from '../config/client';
import ThemeContext from './ThemeContext';
import { actions } from '@/data/actions';
import { NextRouter, useRouter } from 'next/router';
import { Action, State } from '@/../@types/reducer';
import { TAuth, TCart } from '@/../@types/index';
import { reducer, initialState } from '@/lib/reducer';
import useIsomorphicLayoutEffect from '../hooks/custom-layout-efffect';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
    },
  },
});

type TProps = { children: ReactNode };

interface IContext {
  state: State;
  dispatch: Dispatch<Action>;
  logoutPromptController: () => void;
  deleteCommentPromptController: (status: boolean, id: string) => void;
  deleteStoryPromptController: (status: boolean, id: string) => void;
  deleteProductPromptController: (status: boolean, id: string) => void;
  shareProductController: () => void;
  loginPromptController: () => void;
  sortBoxController: () => void;
  cartModalController: () => void;
  searchBoxController: () => void;
  deleteAccountPromptController: () => void;
  deactivateStorePromptController: () => void;
  userWorkingDataController: () => void;
  addProductToCart: (product: TCart) => void;
  removeProductFromCart: (currentProductId: string) => void;
  updateCartProduct: (props: { productId: string; quantity: number }) => void;
  getCartProduct: (currentProductId: string) => TCart;
  logoutUser: () => Promise<void>;
  fetchAPI: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
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
  deleteStoryPromptController: () => {},
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

const AppContext: FC<TProps> = (props): JSX.Element => {
  const CART_KEY: string = 'cart-items';
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // ============= modal controllers =================== //
  const cartModalController = (): void => {
    dispatch({
      type: actions.CART_MODAL,
      payload: { ...state, isCartModal: !state.isCartModal },
    });
  };
  const userWorkingDataController = (): void => {
    dispatch({
      type: actions.USER_WORKING_DATA_MODAL,
      payload: {
        ...state,
        isUserWorkingDataModal: !state.isUserWorkingDataModal,
      },
    });
  };
  const deleteAccountPromptController = (): void => {
    dispatch({
      type: actions.DELETE_ACCOUNT_PROMPT,
      payload: {
        ...state,
        isDeleteAccountPrompt: !state.isDeleteAccountPrompt,
      },
    });
  };
  const deactivateStorePromptController = (): void => {
    dispatch({
      type: actions.DEACTIVATE_STORE_PROMPT,
      payload: {
        ...state,
        isDeactivateStorePrompt: !state.isDeactivateStorePrompt,
      },
    });
  };

  const logoutPromptController = (): void => {
    dispatch({
      type: actions.LOGOUT_PROMPT,
      payload: { ...state, isLogoutPrompt: !state.isLogoutPrompt },
    });
  };

  const loginPromptController = (): void => {
    dispatch({
      type: actions.LOGIN_PROMPT,
      payload: { ...state, isLoginPrompt: !state.isLoginPrompt },
    });
  };

  const searchBoxController = (): void => {
    dispatch({
      type: actions.SEARCH_BOX_CONTROL,
      payload: { ...state, isSearchActive: !state.isSearchActive },
    });
  };

  const sortBoxController = (): void => {
    dispatch({
      type: actions.SORT_BOX_CONTROL,
      payload: { ...state, isSortActive: !state.isSortActive },
    });
  };

  const deleteCommentPromptController = (
    status: boolean,
    id?: string
  ): void => {
    dispatch({
      type: actions.DELETE_COMMENT_PROMPT,
      payload: {
        ...state,
        isDeleteCommentPrompt: { status, commentId: id ?? '' },
      },
    });
  };

  const deleteStoryPromptController = (status: boolean, id?: string): void => {
    dispatch({
      type: actions.DELETE_STORY_PROMPT,
      payload: {
        ...state,
        isDeleteStoryPrompt: { status, storyId: id ?? '' },
      },
    });
  };

  const deleteProductPromptController = (
    status: boolean,
    id?: string
  ): void => {
    dispatch({
      type: actions.DELETE_PRODUCT_PROMPT,
      payload: {
        ...state,
        isDeleteProductPrompt: { status, productId: id ?? '' },
      },
    });
  };

  const shareProductController = (): void => {
    dispatch({
      type: actions.SHARE_PRODUCT_MODAL,
      payload: {
        ...state,
        isShareProductModal: !state.isShareProductModal,
      },
    });
  };

  // ----------------product cart--------------------------
  const getCartProduct = (currentProductId: string): TCart => {
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
  };

  const updateCartProduct = (props: {
    productId: string;
    quantity: number;
  }): void => {
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
  };

  const removeProductFromCart = (currentProductId: string): void => {
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
  };

  const addProductToCart = (product: TCart): void => {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: [...state.cart, { ...product }],
      },
    });
  };

  const syncCartToLocalStorage = (): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  };

  useEffect(() => {
    syncCartToLocalStorage();
  }, [state.cart]);

  useIsomorphicLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);

  const restoreCartFromLocalStorage = (): void => {
    const data: TCart[] = JSON.parse(localStorage.getItem(CART_KEY) || `[]`);

    if (data?.length > 0)
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: data },
      });
  };

  // -------------user authentication---------------
  const validateAuth = async (): Promise<void> => {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: { ...state, auth: { ...data } },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  async function fetchAPI<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    fetch.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error.response?.status);
        if (status > 400 && status < 404) {
          validateAuth().catch((error) => {
            console.error(error?.response?.data?.message ?? error);
            router.push('/auth/sign-in');
          });
        }
        return Promise.reject(error);
      }
    );
    return await fetch<T>({
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
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  const authenticateUser = async (): Promise<void> => {
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
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  useEffect((): void => {
    authenticateUser();
  }, []);

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      validateAuth();
    }, 1000 * 60 * 4);
    return (): void => clearTimeout(timer);
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
            deleteStoryPromptController,
            shareProductController,
            addProductToCart,
            removeProductFromCart,
            updateCartProduct,
            getCartProduct,
            cartModalController,
          }}>
          {props.children}
        </context.Provider>
      </QueryClientProvider>
    </ThemeContext>
  );
};

export default AppContext;
export const useAppContext = (): IContext => useContext(context);
