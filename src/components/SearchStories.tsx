import { FC } from 'react';
import { actions } from '@/data/actions';
import { IoSearch } from 'react-icons/io5';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { SearchContainer as Container } from '@/styles/modules/search-form';

const SearchStories: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const router: NextRouter = useRouter();
  return (
    <Container>
      <form onSubmit={(e): void => e.preventDefault()}>
        <div className='form-element' title='Procurar histórias'>
          <input
            type='text'
            placeholder='Procurar histórias...'
            aria-label='Procurar histórias...'
            title='Procurar histórias...'
            value={state.searchStores}
            onChange={(e): void => {
              dispatch({
                type: actions.SEARCH_USER_STORIES,
                payload: {
                  ...state,
                  searchStories: e.target.value,
                },
              });
            }}
          />
        </div>

        <button
          onClick={(): void => {
            if (state.searchStories.length < 1) return;
            router.push(
              `/feed/stories-search?q=${state.searchStories}`
            );
          }}>
          <IoSearch />
        </button>
      </form>
    </Container>
  );
};

export default SearchStories;
