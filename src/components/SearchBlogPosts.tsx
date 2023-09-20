import { FC } from 'react';
import actions from '@/shared/actions';
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { _search as Container } from '@/styles/modules/search-form';

const SearchComponent: FC = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-element' title='Search'>
          <input
            type='text'
            placeholder='Procurar postagens...'
            title='Procurar postagens...'
            aria-label='Procurar postagens...'
            value={state.search}
            onChange={(e) =>
              dispatch({
                type: actions.SEARCH,
                payload: {
                  ...state,
                  search: e.target.value,
                },
              })
            }
          />
        </div>

        <button
          onClick={() => {
            if (state.search.length < 1) return;
            router.push(`/blog/blog-search?q=${state.search}`);
          }}>
          <IoSearch />
        </button>
      </form>
    </Container>
  );
};

export default SearchComponent;
