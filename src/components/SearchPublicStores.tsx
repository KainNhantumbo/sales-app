import actions from '@/shared/actions';
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { _search as Container } from '@/styles/modules/search-form';

export default function SearchStores() {
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
                  searchStores: e.target.value,
                },
              });
            }}
          />
        </div>

        <button
          onClick={() => {
            if (state.searchStores.length < 1) return;
            router.push(
              `/ecommerce/stores/stores-search?q=${state.searchStores}`
            );
          }}>
          <IoSearch />
        </button>
      </form>
    </Container>
  );
}
