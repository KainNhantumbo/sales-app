import { useAppContext } from '@/context/app-context';
import { actions } from '@/shared/actions';
import { _search as Container } from '@/styles/modules/search-form';
import { useRouter } from 'next/router';
import { IoSearch } from 'react-icons/io5';

export function StoreSearch() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-element' title='Procurar lojas'>
          <input
            type='text'
            placeholder='Procurar lojas...'
            aria-label='Procurar lojas...'
            title='Procurar lojas...'
            value={state.searchStores}
            onChange={(e) => {
              dispatch({
                type: actions.SEARCH_STORES,
                payload: {
                  ...state,
                  searchStores: e.target.value
                }
              });
            }}
          />
        </div>

        <button
          onClick={() => {
            if (state.searchStores.length < 1) return;
            router.push(`/ecommerce/stores/stores-search?q=${state.searchStores}`);
          }}>
          <IoSearch />
        </button>
      </form>
    </Container>
  );
}
