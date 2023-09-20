import { FC } from 'react';
import actions from '@/shared/actions';
import { IoClose } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { _search as Container } from '@/styles/modules/search-form';

const SearchStories: FC = () => {
  const { state, dispatch } = useAppContext();
  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-element' title='Procurar histórias'>
          <input
            type='text'
            placeholder='Procurar histórias...'
            aria-label='Procurar histórias...'
            title='Procurar histórias...'
            value={state.searchStories}
            onChange={(e) => {
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

        {state.searchStories.length > 0 && (
          <button
            className='clear-btn'
            onClick={() =>
              dispatch({
                type: actions.SEARCH_USER_STORIES,
                payload: { ...state, searchStories: '' },
              })
            }>
            <IoClose />
          </button>
        )}
      </form>
    </Container>
  );
};

export default SearchStories;
