import { useAppContext } from '@/context/app-context';
import { actions } from '@/shared/actions';
import { _search as Container } from '@/styles/modules/search-form';
import { IoClose } from 'react-icons/io5';

export function SearchStories() {
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
                  searchStories: e.target.value
                }
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
                payload: { ...state, searchStories: '' }
              })
            }>
            <IoClose />
          </button>
        )}
      </form>
    </Container>
  );
}
