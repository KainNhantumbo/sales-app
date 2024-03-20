import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import type { HttpError } from '@/types';

type Props = { key: 'public-products-list' | 'public-product' };

export function useFavoriteProduct({ key }: Props) {
  const { httpClient, dispatch, state } = useAppContext();
  const onFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
      });

      if (key === 'public-products-list') {
        return dispatch({
          type: actions.PUBLIC_PRODUCTS_LIST_DATA,
          payload: {
            ...state,
            publicProducts: state.publicProducts.map((product) => {
              if (product._id === id) {
                return { ...product, favorites: data };
              }
              return product;
            })
          }
        });
      }
      if (key === 'public-product') {
        return dispatch({
          type: actions.PUBLIC_PRODUCT_DATA,
          payload: {
            ...state,
            publicProduct: { ...state.publicProduct, favorites: data }
          }
        });
      }
    } catch (error) {
      console.error(errorTransformer(error as HttpError));
      console.error(error);
    }
  };

  const onUnFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/products/${id}`
      });

      if (key === 'public-products-list')
        return dispatch({
          type: actions.PUBLIC_PRODUCTS_LIST_DATA,
          payload: {
            ...state,
            publicProducts: state.publicProducts.map((product) => {
              if (product._id === id) {
                return { ...product, favorites: data };
              }
              return product;
            })
          }
        });

      if (key === 'public-product')
        return dispatch({
          type: actions.PUBLIC_PRODUCT_DATA,
          payload: {
            ...state,
            publicProduct: { ...state.publicProduct, favorites: data }
          }
        });
    } catch (error) {
      console.error(errorTransformer(error as HttpError));
      console.error(error);
    }
  };

  return { onFavoriteProduct, onUnFavoriteProduct };
}
