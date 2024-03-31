import { useAppContext } from '@/context/AppContext';
import { CART_STORE_KEY } from '@/data/constants';
import { actions } from '@/shared/actions';
import type { Cart } from '@/types';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import * as React from 'react';

export function useCartStore() {
  const { dispatch, state } = useAppContext();
  const cartModalController = () => {
    dispatch({
      type: actions.CART_MODAL,
      payload: { ...state, isCartModal: !state.isCartModal }
    });
  };

  const getCartProduct = React.useCallback(
    (currentProductId: string): Cart => {
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
    },
    [state.cart]
  );

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
      payload: { ...state, cart: state.cart.concat(product) }
    });
  };

  const syncCartToLocalStorage = React.useCallback(() => {
    localStorage.setItem(CART_STORE_KEY, JSON.stringify(state.cart));
  }, [state.cart]);

  const restoreCartFromLocalStorage = () => {
    const data: Cart[] = JSON.parse(localStorage.getItem(CART_STORE_KEY) || `[]`);

    if (data?.length > 0)
      dispatch({
        type: actions.PRODUCTS_CART,
        payload: { ...state, cart: data }
      });
  };

  React.useEffect(() => {
    syncCartToLocalStorage();
  }, [state.cart, syncCartToLocalStorage]);

  useIsomorphicLayoutEffect(() => {
    restoreCartFromLocalStorage();
  }, []);

  return {
    addProductToCart,
    cartModalController,
    removeProductFromCart,
    getCartProduct,
    updateCartProduct
  };
}
