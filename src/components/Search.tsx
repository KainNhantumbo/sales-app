import { IoSearch } from 'react-icons/io5';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/data/actions';

const SearchComponent = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const router: NextRouter = useRouter();
  return (
    <form onSubmit={(e): void => e.preventDefault()}>
      <div className='form-element' title='Search'>
        <input
          type='text'
          placeholder='Procurar postagens...'
          title='Procurar postagens...'
          aria-label='Procurar postagens...'
          value={state.search}
          onChange={(e): void =>
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
        onClick={(): void => {
          if (state.search.length < 1) return;
          router.push(`/blog/search?q=${state.search}`);
        }}>
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchComponent;
