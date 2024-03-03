import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { _searchBox as Container } from '@/styles/modules/search-box';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

export default function SearchBox() {
  const [inputValue, setInputValue] = useState<string>('');
  const { state, dispatch, searchBoxController } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: actions.PRODUCTS_LIST_QUERY,
        payload: {
          ...state,
          productsListQuery: {
            ...state.productsListQuery,
            query: inputValue
          }
        }
      });
      if (inputValue.length < 1) {
        dispatch({
          type: actions.PRODUCTS_LIST_QUERY,
          payload: {
            ...state,
            productsListQuery: {
              ...state.productsListQuery,
              query: ''
            }
          }
        });
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <AnimatePresence>
      {state.isSearchActive && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              searchBoxController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: -290 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: -290, transition: { duration: 0.3 } }}>
            <div className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <BiSearch />
                  <span>Pesquisar</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={searchBoxController}>
                  <FiX />
                </button>
              </div>
              <div className='prompt-info'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type='search'
                    name='name'
                    placeholder='Procurar produtos...'
                    autoFocus={true}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
