import Select from 'react-select';
import { useRouter } from 'next/router';
import { actions } from '@/data/actions';
import { IoSearch } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { renderReactSelectCSS } from '@/styles/select';
import product_categories from '../data/product-categories.json';
import { SeachEngineContainer as Container } from '../styles/modules/search-engine';

export default function SearchEngine(): JSX.Element {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const theme = useTheme();

  const categoryOptions = product_categories.map((category) => ({
    value: category,
    label: category
  }));

  return (
    <Container>
      <div className='form-container'>
        <form
          className='form-search'
          onSubmit={(e): void => {
            e.preventDefault();
          }}>
          <div className='form-element' title='Search'>
            <input
              type='text'
              placeholder='Pesquisar produtos...'
              value={state.search}
              onChange={(e): void => {
                dispatch({
                  type: actions.SEARCH,
                  payload: {
                    ...state,
                    search: e.target.value
                  }
                });
              }}
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
      </div>
      <div className='categories-container'>
        <Select
          options={categoryOptions}
          placeholder={'Categoria de produtos'}
          styles={renderReactSelectCSS(theme)}
        />
      </div>
    </Container>
  );
}
