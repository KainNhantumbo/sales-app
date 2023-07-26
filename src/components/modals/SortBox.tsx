import type { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { actions } from '@/data/actions';
import { BiSortAlt2 } from 'react-icons/bi';
import { HiSelector } from 'react-icons/hi';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { _sortBox as Container } from '@/styles/modules/sort-box';

const SortOptions = [
  { code: 'name', name: 'Nome' },
  { code: '-name', name: 'Nome (desc.)' },
  { code: 'category', name: 'Categoria' },
  { code: '-category', name: 'Categoria (desc.)' },
  { code: 'price', name: 'Preço' },
  { code: '-price', name: 'Preço (desc.)' },
  { code: 'createdAt', name: 'Data de criação' },
  { code: '-createdAt', name: 'Data de criação (desc.)' },
];

const SortBox: FC = (): JSX.Element => {
  const { state, dispatch, sortBoxController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isSortActive && (
        <Container
          className='main'
          onClick={(e): any => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              sortBoxController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ y: -290 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
            exit={{ y: -290, transition: { duration: 0.3 } }}>
            <section className='dialog-prompt'>
              <div className='top'>
                <h2>
                  <BiSortAlt2 />
                  <span>Ordenar por...</span>
                </h2>
                <button
                  className='quit'
                  title='Close'
                  onClick={sortBoxController}>
                  <FiX />
                </button>
              </div>
              <section className='prompt-info'>
                {SortOptions.map((option) => (
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.8 }}
                    key={option.code}
                    onClick={() => {
                      sortBoxController();
                      dispatch({
                        type: actions.PRODUCTS_LIST_QUERY,
                        payload: {
                          ...state,
                          productsListQuery: {
                            ...state.productsListQuery,
                            sort: option.code,
                          },
                        },
                      });
                    }}>
                    <HiSelector />
                    <span>{option.name}</span>
                  </motion.div>
                ))}
              </section>
            </section>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default SortBox;
