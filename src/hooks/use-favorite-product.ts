import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import type { HttpError } from '@/types';

export function useFavoriteProduct() {
  const { httpClient, dispatch, state } = useAppContext();
  const onFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: { ...state, publicProduct: { ...state.publicProduct, favorites: data } }
      });
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
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: { ...state, publicProduct: { ...state.publicProduct, favorites: data } }
      });
    } catch (error) {
      console.error(errorTransformer(error as HttpError));
      console.error(error);
    }
  };

  return { onFavoriteProduct, onUnFavoriteProduct };
}
