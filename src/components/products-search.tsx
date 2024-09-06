import { useAppContext } from '@/context/app-context';
import { PublicProductsQueryParams } from '@/hooks/use-public-products-query';
import { useInnerWindowSize } from '@/hooks/use-window-size';
import { slidePageUp } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { Option } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import * as Io from 'react-icons/io5';
import Categories from '../data/product-categories.json';
import { _searchEngine as Container } from '../styles/modules/search-engine';
import { SelectContainer } from './select';

const sortOptions: Option[] = [
  { value: 'createdAt', label: 'Adicionado Recentemente' },
  { value: '-createdAt', label: 'Adicionado Antigamente' },
  { value: 'name', label: 'Nome' },
  { value: '-name', label: 'Nome (Invertido)' },
  { value: 'category', label: 'Categoria' },
  { value: '-category', label: 'Categoria (Invertido)' },
  { value: '-price', label: 'Preço (Alto para Baixo)' },
  { value: 'price', label: 'Preço (Baixo para Alto)' }
];

const promotionOptions: Option[] = [
  { value: '', label: 'Todos os produtos' },
  { value: '1', label: 'Somente produtos com promoção' },
  { value: '0', label: 'Somente produtos sem promoção' }
];

const categoryOptions = Categories.map((category) => ({
  value: category,
  label: category
}));

type Props = {
  query: PublicProductsQueryParams;
  setQuery: React.Dispatch<React.SetStateAction<PublicProductsQueryParams>>;
  isAnyFilterActive: boolean;
};

export function ProductsSearch({ query, setQuery, isAnyFilterActive }: Props) {
  const { state, dispatch } = useAppContext();
  const { width: windowInnerWidth } = useInnerWindowSize();
  const toggleMenu = () => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
      payload: {
        ...state,
        isPublicProductsFilters: !state.isPublicProductsFilters
      }
    });
  };

  React.useEffect(() => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
      payload: { ...state, isPublicProductsFilters: windowInnerWidth > 830 }
    });
  }, [windowInnerWidth]);

  return (
    <AnimatePresence>
      {state.isPublicProductsFilters && (
        <Container
          forwardedAs={'aside'}
          onClick={(e: any) => {
            const [target] = (e as any).target.classList;
            if (target?.includes('search-engine')) {
              dispatch({
                type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                payload: { ...state, isPublicProductsFilters: false }
              });
            }
          }}>
          <motion.div
            className='wrapper-container'
            style={{ display: state.isPublicProductsFilters ? 'flex' : 'none' }}
            transition={{ duration: 0.38 }}
            drag={windowInnerWidth > 830 ? undefined : 'y'}
            dragElastic={{ top: 0.12, bottom: 0.1 }}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              event.preventDefault();
              event.stopImmediatePropagation();
              if (info.offset.y > 350) {
                dispatch({
                  type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                  payload: { ...state, isPublicProductsFilters: false }
                });
              }
            }}
            exit={
              windowInnerWidth > 830
                ? { opacity: 0, transition: { duration: 0.4 } }
                : { opacity: 0, translateY: 720, transition: { duration: 0.38 } }
            }>
            <button
              onTouchEnd={toggleMenu}
              onClick={toggleMenu}
              className='onDragCloseButton'
              title='Fechar aba'
            />

            <section className='header-container'>
              <h3>
                <Io.IoFilter />
                <span>Filtros</span>
              </h3>

              {isAnyFilterActive ? (
                <button
                  onClick={() =>
                    setQuery({ search: '', category: '', promotion: '', sort: '' })
                  }>
                  <Io.IoClose />
                  <span>Limpar filtros</span>
                </button>
              ) : null}
            </section>
            <div className='form-container'>
              <form className='form-search' onSubmit={(e) => e.preventDefault()}>
                <div className='form-element' title='Search'>
                  <input
                    type='text'
                    placeholder='Pesquisar...'
                    value={query.search}
                    onChange={(e) =>
                      setQuery((state) => ({ ...state, search: e.target.value }))
                    }
                  />
                </div>
              </form>
            </div>

            <div className='caret-container'>
              <h3>
                <Io.IoLayersOutline />
                <span>Filtrar por</span>
              </h3>
              <SelectContainer
                options={categoryOptions}
                placeholder={'Selecione uma categoria'}
                value={categoryOptions.find((item) => item.value == query.category)}
                onChange={({ value }: any) =>
                  setQuery((state) => ({ ...state, category: String(value) }))
                }
              />
            </div>

            <div className='caret-container'>
              <h3>
                <BiSortAlt2 />
                <span>Ordenar por</span>
              </h3>
              <SelectContainer
                options={sortOptions}
                placeholder={'Selecione a opção'}
                value={sortOptions.find((item) => item.value == query.sort)}
                onChange={({ value }: any) =>
                  setQuery((state) => ({ ...state, sort: String(value) }))
                }
              />
            </div>
            <div className='caret-container'>
              <h3>
                <Io.IoGift />
                <span>Promoções</span>
              </h3>
              <SelectContainer
                options={promotionOptions}
                placeholder={'Selecione a opção'}
                value={promotionOptions.find((item) => item.value == query.promotion)}
                onChange={({ value }: any) => {
                  setQuery((state) => ({ ...state, promotion: value }));
                }}
              />
            </div>

            <div className='caret-container'>
              {isAnyFilterActive ? (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='show-results-btn'
                  onClick={() => {
                    dispatch({
                      type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                      payload: { ...state, isPublicProductsFilters: false }
                    });
                    windowInnerWidth < 830 && slidePageUp();
                  }}>
                  <Io.IoCartOutline />
                  <span>Mostrar {state.publicProducts.length} resultados</span>
                </motion.button>
              ) : null}
            </div>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}
