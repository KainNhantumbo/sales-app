import type { FC } from 'react';
import { actions } from '@/data/actions';
import { IoSearch } from 'react-icons/io5';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { _search as Container } from '@/styles/modules/search-form';

const SearchStores: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const router: NextRouter = useRouter();
  return (
    <Container>
      <form onSubmit={(e): void => e.preventDefault()}>
        <div className='form-element' title='Procurar lojas'>
          <input
            type='text'
            placeholder='Procurar lojas...'
            aria-label='Procurar lojas...'
            title='Procurar lojas...'
            value={state.searchStores}
            onChange={(e): void => {
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
          onClick={(): void => {
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
};

export default SearchStores;
