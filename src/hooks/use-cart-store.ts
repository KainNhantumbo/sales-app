import { useAppContext } from '@/context/AppContext';
import { CART_STORE_KEY } from '@/data/constants';
import { actions } from '@/shared/actions';
import type { Cart } from '@/types';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useEffect } from 'react';

export function useCartStore() {
  const { dispatch, state } = useAppContext();
  const cartModalController = () => {
    dispatch({
      type: actions.CART_MODAL,
      payload: { ...state, isCartModal: !state.isCartModal }
    });
  };

  const getCartProduct = (currentProductId: string): Cart => {
    const foundProduct = state.cart.some(
      (product) => product.productId === currentProductId
    );

    if (foundProduct)
      return state.cart.filter((product) => product.productId === currentProductId)[0];
    return {
      productId: '',
      quantity: 1,
      productName: '',
      previewImage: undefined,
      price: 0
    };
  };

  const updateCartProduct = (props: { productId: string; quantity: number }) => {
    dispatch({
      type: actions.PRODUCTS_CART,
      payload: {
        ...state,
        cart: state.cart.map((product) =>
          product.productId === props.productId ? { ...product, ...props } : product
        )
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
            : state.cart.filter((product) => product.productId !== currentProductId)
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
    localStorage.setItem(CART_STORE_KEY, JSON.stringify(state.cart));
  };

  useEffect(() => {
    syncCartToLocalStorage();
  }, [state.cart]);

  useIsomorphicLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);

  const restoreCartFromLocalStorage = () => {
    const data: Cart[] = JSON.parse(localStorage.getItem(CART_STORE_KEY) || `[]`);

    if (data?.length > 0)
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: data }
      });
  };

  return {
    addProductToCart,
    cartModalController,
    removeProductFromCart,
    getCartProduct,
    updateCartProduct
  };
}
